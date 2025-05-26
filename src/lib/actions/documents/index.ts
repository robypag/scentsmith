"use server";

import { createResource } from "./resource";
import { documents, users } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { summarizeDocument } from "@/lib/ai/llm";
import { DocumentDTO } from "@/types/document";

export async function loadDocuments(): Promise<DocumentDTO[]> {
    try {
        const existingDocuments = await db.select().from(documents);
        return existingDocuments.map((doc) => ({ ...doc, tags: doc.tags?.join(",") }));
    } catch (error) {
        throw error instanceof Error ? error : new Error("Error, please try again.");
    }
}

export async function loadDocument(id: string): Promise<DocumentDTO> {
    try {
        const [existingDocument] = await db.select().from(documents).where(eq(documents.id, id)).limit(1);
        return {
            ...existingDocument,
            tags: existingDocument.tags?.join(",") || "",
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
        let [user] = await db.select().from(users).where(eq(users.email, session.user.email));
        if (!user) {
            // Create user if not exists (for demo purposes)
            [user] = await db
                .insert(users)
                .values({
                    email: session.user.email,
                    name: session.user.name || "Demo User",
                })
                .returning();
        }

        // Convert File to Buffer for document loaders
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64String = buffer.toString("base64");
        const dataUrl = `data:${file.type};base64,${base64String}`;

        // Choose appropriate document loader based on file type
        let loader;
        switch (file.type) {
            case "application/pdf":
                // Create a temporary file-like object for PDFLoader
                const pdfBlob = new Blob([buffer], { type: "application/pdf" });
                loader = new PDFLoader(pdfBlob);
                break;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            case "application/msword":
                // Create a temporary file-like object for DocxLoader
                const docBlob = new Blob([buffer], {
                    type: file.type,
                });
                loader = new DocxLoader(docBlob);
                break;
            default:
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

        // Load and process the document
        const docs = await loader.load();

        // Process each page/document chunk
        for (let i = 0; i < docs.length; i++) {
            const doc = docs[i];
            await createResource(
                createdDocument.id,
                doc.pageContent,
                i + 1, // Page numbers start from 1
            );
        }

        return {
            success: true,
            documentId: createdDocument.id,
            message: `Document "${title}" uploaded successfully. Text extraction will be implemented in a future update.`,
        };
    } catch (error) {
        throw error instanceof Error ? error : new Error("Error uploading file, please try again.");
    }
}
