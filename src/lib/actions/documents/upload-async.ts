"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { documents } from "@/lib/db/schema";
import { queueManager } from "@/server/workers/lib/queue-manager";
import { DocumentProcessingJobData } from "@/server/workers/lib/types";

import { nanoid } from "nanoid";

export async function uploadDocumentAsync(formData: FormData) {
    try {
        // Extract form data
        const title = formData.get("title") as string;
        const type = formData.get("type") as string;
        const tags = formData.get("tags") as string;
        const file = formData.get("files") as File;

        if (!file || !title || !type) {
            throw new Error("Missing required fields: title, type, or file");
        }

        // Get authenticated user
        const session = await auth();
        if (!session?.user?.email) {
            throw new Error("User must be authenticated");
        }

        // Create document entry
        const [createdDocument] = await db
            .insert(documents)
            .values({
                title,
                type,
                tags: tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                uploadedBy: session.user.id,
                status: "pending",
            })
            .returning();

        // Prepare job data
        const fileContent = Buffer.from(await file.arrayBuffer());
        const jobData: DocumentProcessingJobData = {
            userId: session.user.id,
            jobId: nanoid(),
            createdAt: new Date(),
            documentId: createdDocument.id,
            fileName: file.name,
            fileContent,
            mimeType: file.type,
        };

        // Register job when user uploads document
        const queueJobId = await queueManager.addDocumentProcessingJob(jobData);

        return {
            success: true,
            documentId: createdDocument.id,
            jobId: queueJobId,
            message: `Document "${title}" queued for processing`,
        };
    } catch (error) {
        console.error("Document upload error:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to upload document");
    }
}
