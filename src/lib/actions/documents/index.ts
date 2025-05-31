"use server";

// createResource functionality moved to background workers
import { documents, embeddings, resources } from "../../db/schema";
import { db } from "../../db";
import { and, sql, eq, cosineDistance, desc, gt, inArray } from "drizzle-orm";
import { auth } from "@/auth";
// LangChain loaders moved to background workers
import { summarizeDocument } from "@/lib/ai/llm";
import { DocumentDTO } from "@/types/document";
import { generateEmbedding } from "@/lib/ai/embeddings";

type DocumentSearchParams = {
    documentIds?: string[];
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

export async function searchDocuments({
    documentIds,
    query,
    ingredientIds,
    topics,
    tags,
    limit = 5,
}: DocumentSearchParams) {
    const queryEmbedding = await generateEmbedding(query);
    const similarity = sql<number>`1 - (${cosineDistance(embeddings.embedding, queryEmbedding)})`;

    const conditions = [];
    // If provided, search only within the specified document
    if (documentIds?.length) {
        conditions.push(inArray(resources.documentId, documentIds));
    }
    if (ingredientIds?.length) {
        conditions.push(sql`${embeddings.chemicals} && ${sql`ARRAY[${sql.join(ingredientIds)}]::uuid[]`}`);
    }
    if (topics?.length) {
        conditions.push(sql`${embeddings.topics} && ${sql`ARRAY[${sql.join(topics)}]::text[]`}`);
    }
    if (tags?.length) {
        conditions.push(sql`${embeddings.tags} && ${sql`ARRAY[${sql.join(tags)}]::text[]`}`);
    }

    conditions.push(gt(similarity, 0.3));

    const results = await db
        .select({
            content: embeddings.content,
            similarity,
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
        .orderBy((t) => desc(t.similarity))
        .limit(limit);

    return results;
}

export async function performSemanticSearch(query: string, limit: number = 5, documentId?: string) {
    try {
        if (!query.trim()) {
            return [];
        }

        const results = await searchDocuments({ documentIds: documentId ? [documentId] : [], query, limit });
        return results.map((result) => ({
            content: result.content,
            topics: result.topics || [],
            tags: result.tags || [],
            chemicals: result.chemicals || [],
            pageNumber: result.pageNumber,
            documentTitle: result.documentTitle,
            similarity: result.similarity,
        }));
    } catch (error) {
        console.error("Semantic search error:", error);
        throw error instanceof Error ? error : new Error("Failed to perform semantic search");
    }
}

export async function findRelatedDocuments(documentId: string, limit: number = 3) {
    try {
        // Get the document to find related ones
        const document = await loadDocument(documentId);
        if (!document || !document.summarization) {
            return [];
        }

        // Use the document's summarization as the search query
        const results = await searchDocuments({
            query: document.summarization,
            limit: limit + 1, // Get one extra to filter out the current document
        });

        // Filter out the current document and return related ones
        return results
            .filter((result) => result.documentTitle !== document.title)
            .slice(0, limit)
            .map((result, index) => ({
                id: `related-${index}`, // In a real implementation, this would be the actual document ID
                title: result.documentTitle,
                similarity: Math.round((1 - (index + 1) * 0.1) * 100), // Mock similarity percentage
                content: result.content.substring(0, 200) + "...",
                pageNumber: result.pageNumber,
            }));
    } catch (error) {
        console.error("Related documents search error:", error);
        return [];
    }
}
