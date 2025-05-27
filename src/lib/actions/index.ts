"use server";

import { uploadFile } from "./documents";

// Re-export ingredients actions
export * from "./ingredients";

export async function uploadDocument(formData: FormData) {
    try {
        // Extract form data for single file
        const title = formData.get("title") as string;
        const type = formData.get("type") as string;
        const tags = formData.get("tags") as string;
        const file = formData.get("files") as File;

        if (!file || !title || !type) {
            throw new Error("Missing required fields: title, type, or file");
        }

        console.log("Upload request:", {
            title,
            type,
            tags: tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            file: { name: file.name, size: file.size, type: file.type },
        });

        // Upload the single file
        const result = await uploadFile(title, type, tags, file);

        return { 
            success: true, 
            message: result.message,
            documentId: result.documentId 
        };
    } catch (error) {
        console.error("Document upload error:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to upload document");
    }
}