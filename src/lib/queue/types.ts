export interface BaseJobData {
    userId: string;
    jobId: string;
    createdAt: Date;
}

export type DocumentProcessingJobDataContent = {
    type: string;
    data: Buffer;
}

export interface DocumentProcessingJobData extends BaseJobData {
    documentId: string;
    fileName: string;
    fileContent: Buffer | DocumentProcessingJobDataContent;
    mimeType: string;
}

export interface EmbeddingJobData extends BaseJobData {
    documentId: string;
    chunks: Array<{
        content: string;
        metadata: Record<string, unknown>;
    }>;
}

export interface AnalysisJobData extends BaseJobData {
    type: "fragrance-match" | "compliance-check";
    targetId: string;
    parameters: Record<string, unknown>;
}

export type JobData = DocumentProcessingJobData | EmbeddingJobData | AnalysisJobData;

export interface JobProgress {
    percentage: number;
    message: string;
    step: string;
    timestamp: Date;
    metadata?: Record<string, unknown>;
}

export interface JobResult {
    success: boolean;
    data?: unknown;
    error?: string;
    completedAt: Date;
}

export enum JobStatus {
    PENDING = "pending",
    ACTIVE = "active",
    COMPLETED = "completed",
    FAILED = "failed",
    DELAYED = "delayed",
    PAUSED = "paused",
}

export enum QueueNames {
    DOCUMENT_PROCESSING = "document-processing",
    EMBEDDING_GENERATION = "embedding-generation",
    ANALYSIS = "analysis",
}

export enum JobTypes {
    PROCESS_DOCUMENT = "process-document",
    GENERATE_EMBEDDINGS = "generate-embeddings",
    ANALYZE_FRAGRANCE = "analyze-fragrance",
    CHECK_COMPLIANCE = "check-compliance",
}
