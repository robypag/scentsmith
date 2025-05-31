import { Worker, Job } from "bullmq";
import { getRedisClient } from "./lib/redis-client";
import { DocumentProcessingJobData, QueueNames, JobProgress } from "./lib/types";
import { extractDocumentMetadata, summarizeDocument } from "@/lib/ai/llm";
import { generateEmbeddings } from "@/lib/ai/embeddings";
import { db } from "@/lib/db";
import { documents, resources, embeddings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { tagChunk, preloadIngredients } from "@/lib/ai/llm";

class DocumentProcessorWorker {
    private worker: Worker;

    constructor() {
        console.log("Creating DocumentProcessorWorker...");

        this.worker = new Worker(QueueNames.DOCUMENT_PROCESSING, this.processJob.bind(this), {
            connection: getRedisClient(),
            concurrency: 2, // Process 2 documents simultaneously
        });

        this.worker.on("ready", () => {
            console.log("Document processing worker is ready");
        });

        this.worker.on("active", (job) => {
            console.log(`Document processing job ${job.id} started`);
        });

        this.worker.on("completed", (job) => {
            console.log(`Document processing job ${job.id} completed`);
        });

        this.worker.on("failed", (job, err) => {
            console.error(`Document processing job ${job?.id} failed:`, err);
        });

        this.worker.on("error", (err) => {
            console.error("Document processing worker error:", err);
        });

        console.log("DocumentProcessorWorker created successfully");
    }

    private async processJob(job: Job<DocumentProcessingJobData>) {
        const { documentId, fileName, fileContent, mimeType } = job.data;

        try {
            // Step 0: Started
            await this.updateProgress(job, {
                percentage: 0,
                message: `Started processing ${fileName}`,
                step: "started",
                timestamp: new Date(),
            });

            // Step 1: Extract text content
            await this.updateProgress(job, {
                percentage: 10,
                message: "Extracting text content...",
                step: "text_extraction",
                timestamp: new Date(),
            });

            const fileBuffer = Buffer.isBuffer(fileContent) ? fileContent : Buffer.from(fileContent.data);
            const textContent = await this.extractTextContent(fileBuffer, fileName, mimeType);

            // Step 2: Generate summary
            await this.updateProgress(job, {
                percentage: 30,
                message: "Generating document summary...",
                step: "summarization",
                timestamp: new Date(),
            });

            // TODO: Re-enable summarization after testing
            const base64String = fileBuffer.toString("base64");
            const dataUrl = `data:${mimeType};base64,${base64String}`;
            const summary = await summarizeDocument(dataUrl, mimeType);

            // Step 2.5: Extract Metadata:
            await this.updateProgress(job, {
                percentage: 40,
                message: "Extracting relevant metadata...",
                step: "metadata_extraction",
                timestamp: new Date(),
            });
            const metadata = await extractDocumentMetadata(textContent);

            // Step 3: Update document with summary
            await this.updateProgress(job, {
                percentage: 50,
                message: "Updating document record...",
                step: "database_update",
                timestamp: new Date(),
            });

            await db
                .update(documents)
                .set({
                    summarization: summary,
                    metadata,
                    status: "processing",
                })
                .where(eq(documents.id, documentId));

            // Step 4: Generate chunks and embeddings
            await this.updateProgress(job, {
                percentage: 70,
                message: "Processing content chunks...",
                step: "chunking",
                timestamp: new Date(),
            });

            const embeddingData = await generateEmbeddings(textContent);

            // Step 5: Create resource and store embeddings
            await this.updateProgress(job, {
                percentage: 90,
                message: "Tag chunks and storing embeddings...",
                step: "embedding_storage",
                timestamp: new Date(),
            });

            // Create the resource record
            const [resource] = await db
                .insert(resources)
                .values({
                    documentId,
                    content: textContent,
                    pageNumber: 1,
                })
                .returning();

            // Store embeddings for each chunk
            const embeddingInserts = embeddingData.map((item) => ({
                resourceId: resource.id,
                content: item.content,
                embedding: item.embedding,
                topics: [],
                tags: [],
                chemicals: [],
            }));

            await db.insert(embeddings).values(embeddingInserts);

            // Step 6: Mark as completed
            await db.update(documents).set({ status: "ready" }).where(eq(documents.id, documentId));

            await this.updateProgress(job, {
                percentage: 100,
                message: "Document processing completed successfully",
                step: "completed",
                timestamp: new Date(),
                metadata: {
                    chunksCount: embeddingData.length,
                    summary: summary.substring(0, 100) + "...",
                },
            });

            return {
                success: true,
                documentId,
                resourceId: resource.id,
                chunksCount: embeddingData.length,
                summary,
            };
        } catch (err) {
            console.error("Document processing failed:", err);
            // Mark document as failed
            await db.update(documents).set({ status: "failed" }).where(eq(documents.id, documentId));
            throw err;
        }
    }

    private async extractTextContent(fileContent: Buffer, fileName: string, mimeType: string): Promise<string> {
        const tempFilePath = join(tmpdir(), `temp_${Date.now()}_${fileName}`);

        try {
            // Write buffer to temporary file
            writeFileSync(tempFilePath, fileContent);

            let loader;

            if (mimeType === "application/pdf") {
                loader = new PDFLoader(tempFilePath);
            } else if (mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                loader = new DocxLoader(tempFilePath);
            } else if (mimeType === "text/plain") {
                loader = new TextLoader(tempFilePath);
            } else {
                throw new Error(`Unsupported file type: ${mimeType}`);
            }

            const docs = await loader.load();
            return docs.map((doc) => doc.pageContent).join("\n\n");
        } finally {
            // Clean up temporary file
            try {
                unlinkSync(tempFilePath);
            } catch {
                console.warn("Failed to clean up temp file:", tempFilePath);
            }
        }
    }

    private async updateProgress(job: Job, progress: JobProgress) {
        console.log(`[WORKER] Updating progress for job ${job.id}:`, progress);
        await job.updateProgress(progress);

        // Dispatch event to notification center
        const channel = `job_progress:${job.data.userId}`;
        const message = {
            jobId: job.id!,
            status:
                progress.step === "started" ? "started" : progress.step === "completed" ? "completed" : "processing",
            progress: progress.percentage,
            message: progress.message,
        };

        console.log(`[WORKER] Publishing to channel "${channel}":`, message);

        try {
            const redis = getRedisClient();
            const result = await redis.publish(channel, JSON.stringify(message));
            console.log(`[WORKER] Published to ${result} subscribers`);
        } catch (error) {
            console.error("[WORKER] Failed to dispatch job event:", error);
        }
    }

    async close() {
        await this.worker.close();
    }
}

let documentProcessorWorker: DocumentProcessorWorker | null = null;

export function startDocumentProcessorWorker() {
    if (!documentProcessorWorker) {
        documentProcessorWorker = new DocumentProcessorWorker();
    }
    return documentProcessorWorker;
}

export function stopDocumentProcessorWorker() {
    if (documentProcessorWorker) {
        documentProcessorWorker.close();
        documentProcessorWorker = null;
    }
}
