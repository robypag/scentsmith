"use server";

import { resources, embeddings } from "../../db/schema";
import { db } from "../../db";
import { generateEmbeddings } from "../../ai/embeddings";

export async function createResource(documentId: string, content: string, pageNumber: number) {
    try {
        // Generate embeddings for the content
        const embeddingData = await generateEmbeddings(content);
        // Create the resource first
        const [resource] = await db
            .insert(resources)
            .values({
                documentId,
                content,
                pageNumber,
            })
            .returning();
        // Store embeddings for each chunk
        const embeddingInserts = embeddingData.map((item) => ({
            resourceId: resource.id,
            content: item.content,
            embedding: item.embedding,
        }));

        await db.insert(embeddings).values(embeddingInserts);

        return resource;
    } catch (error) {
        throw error instanceof Error ? error : new Error("Error creating resource");
    }
}
