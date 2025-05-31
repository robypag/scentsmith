"use server";

// createResource functionality moved to background workers
import { documents, embeddings, resources } from "../../db/schema";
import { db } from "../../db";
import { and, sql, eq } from "drizzle-orm";
import { auth } from "@/auth";
// LangChain loaders moved to background workers
import { summarizeDocument } from "@/lib/ai/llm";
import { DocumentDTO } from "@/types/document";
import { generateEmbedding } from "@/lib/ai/embeddings";

type DocumentSearchParams = {
    query: string;
    ingredientIds?: string[];
    topics?: string[];
    tags?: string[];
    limit?: number;
};

export async function loadDocuments(): Promise<DocumentDTO[]> {
    try {
        const existingDocuments = await db.select().from(documents);
        return existingDocuments.map((doc) => ({ ...doc, tags: doc.tags, metadata: JSON.stringify(doc.metadata) }));
    } catch (error) {
        throw error instanceof Error ? error : new Error("Error, please try again.");
    }
}

export async function loadDocument(id: string): Promise<DocumentDTO> {
    try {
        const [existingDocument] = await db.select().from(documents).where(eq(documents.id, id)).limit(1);
        return {
            ...existingDocument,
            tags: existingDocument.tags || [],
            metadata: JSON.stringify(existingDocument.metadata),
        };
    } catch (error) {
        throw error instanceof Error ? error : new Error("Error, please try again.");
    }
}

export async function deleteDocument(id: string) {
    try {
        await db.delete(documents).where(eq(documents.id, id));
        return "Document successfully deleted.";
    } catch (error) {
        throw error instanceof Error ? error : new Error("Error, please try again.");
    }
}

export async function uploadFile(title: string, type: string, tags: string, file: File) {
    try {
        // Get current user session
        const session = await auth();
        if (!session?.user?.email) {
            throw new Error("User must be authenticated to upload documents");
        }

        // Find or create user by email
        const user = session?.user;

        // Convert File to Buffer for document loaders
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64String = buffer.toString("base64");
        const dataUrl = `data:${file.type};base64,${base64String}`;

        // Note: Text extraction is now handled by background workers
        if (
            ![
                "application/pdf",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/msword",
            ].includes(file.type)
        ) {
            throw new Error(`Unsupported file type: ${file.type}. Only PDF and DOC/DOCX files are supported.`);
        }

        // Create document entry first
        const summarizedDocument = await summarizeDocument(dataUrl, file.type);
        const [createdDocument] = await db
            .insert(documents)
            .values({
                title,
                type,
                summarization: summarizedDocument,
                tags: tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                uploadedBy: user.id,
            })
            .returning();

        // Note: Document processing is now handled by background workers
        // The document record is created here, but text extraction,
        // chunking, and embedding generation happens asynchronously

        return {
            success: true,
            documentId: createdDocument.id,
            message: `Document "${title}" uploaded successfully. Text extraction will be implemented in a future update.`,
        };
    } catch (error) {
        throw error instanceof Error ? error : new Error("Error uploading file, please try again.");
    }
}

export async function searchDocuments({ query, ingredientIds, topics, tags, limit = 5 }: DocumentSearchParams) {
    const queryEmbedding = await generateEmbedding(query);
    const conditions = [];
    if (ingredientIds?.length) {
        conditions.push(sql`${embeddings.chemicals} && ${sql`ARRAY[${sql.join(ingredientIds)}]::uuid[]`}`);
    }
    if (topics?.length) {
        conditions.push(sql`${embeddings.topics} && ${sql`ARRAY[${sql.join(topics)}]::text[]`}`);
    }
    if (tags?.length) {
        conditions.push(sql`${embeddings.tags} && ${sql`ARRAY[${sql.join(tags)}]::text[]`}`);
    }
    const results = await db
        .select({
            content: embeddings.content,
            topics: embeddings.topics,
            tags: embeddings.tags,
            chemicals: embeddings.chemicals,
            pageNumber: resources.pageNumber,
            documentTitle: documents.title,
        })
        .from(embeddings)
        .innerJoin(resources, eq(embeddings.resourceId, resources.id))
        .innerJoin(documents, eq(resources.documentId, documents.id))
        .where(and(...conditions)) // safe: empty `and()` resolves to true
        .orderBy(sql`${embeddings.embedding} <#> ${sql`[${queryEmbedding.join(",")}]`}`) // cosine distance
        .limit(limit);

    return results;
}
