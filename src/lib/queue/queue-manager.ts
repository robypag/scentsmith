import { Queue, QueueOptions, JobsOptions } from "bullmq";
import { getRedisClient } from "./redis-client";
import { QueueNames, JobTypes, DocumentProcessingJobData, EmbeddingJobData, AnalysisJobData } from "./types";

const defaultJobOptions: JobsOptions = {
    removeOnComplete: 50,
    removeOnFail: 20,
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 2000,
    },
};

const queueOptions: QueueOptions = {
    connection: getRedisClient(),
    defaultJobOptions,
};

class QueueManager {
    private queues: Map<QueueNames, Queue> = new Map();

    private getQueue(queueName: QueueNames): Queue {
        if (!this.queues.has(queueName)) {
            const queue = new Queue(queueName, queueOptions);
            this.queues.set(queueName, queue);
        }
        return this.queues.get(queueName)!;
    }

    async addDocumentProcessingJob(data: DocumentProcessingJobData, options?: JobsOptions): Promise<string> {
        console.log('Adding document processing job:', data.documentId, data.fileName);
        const queue = this.getQueue(QueueNames.DOCUMENT_PROCESSING);
        const job = await queue.add(JobTypes.PROCESS_DOCUMENT, data, {
            ...defaultJobOptions,
            ...options,
            priority: 10, // High priority for document processing
        });
        console.log('Job added with ID:', job.id);
        return job.id!;
    }

    async addEmbeddingJob(data: EmbeddingJobData, options?: JobsOptions): Promise<string> {
        const queue = this.getQueue(QueueNames.EMBEDDING_GENERATION);
        const job = await queue.add(JobTypes.GENERATE_EMBEDDINGS, data, {
            ...defaultJobOptions,
            ...options,
            priority: 5, // Medium priority for embeddings
        });
        return job.id!;
    }

    async addAnalysisJob(data: AnalysisJobData, options?: JobsOptions): Promise<string> {
        const queue = this.getQueue(QueueNames.ANALYSIS);
        const jobType = data.type === "fragrance-match" ? JobTypes.ANALYZE_FRAGRANCE : JobTypes.CHECK_COMPLIANCE;

        const job = await queue.add(jobType, data, {
            ...defaultJobOptions,
            ...options,
            priority: 1, // Lower priority for analysis
        });
        return job.id!;
    }

    async getJobStatus(queueName: QueueNames, jobId: string) {
        const queue = this.getQueue(queueName);
        const job = await queue.getJob(jobId);

        if (!job) {
            return null;
        }

        return {
            id: job.id,
            name: job.name,
            data: job.data,
            progress: job.progress,
            returnvalue: job.returnvalue,
            failedReason: job.failedReason,
            processedOn: job.processedOn,
            finishedOn: job.finishedOn,
            opts: job.opts,
        };
    }

    async getUserJobs(userId: string) {
        const allJobs = [];

        for (const [queueName, queue] of this.queues) {
            const jobs = await queue.getJobs(["active", "waiting", "completed", "failed"]);
            const userJobs = jobs.filter((job) => job.data?.userId === userId);
            allJobs.push(
                ...userJobs.map((job) => ({
                    ...job,
                    queueName,
                })),
            );
        }

        return allJobs;
    }

    async pauseQueue(queueName: QueueNames): Promise<void> {
        const queue = this.getQueue(queueName);
        await queue.pause();
    }

    async resumeQueue(queueName: QueueNames): Promise<void> {
        const queue = this.getQueue(queueName);
        await queue.resume();
    }

    async getQueueStats(queueName: QueueNames) {
        const queue = this.getQueue(queueName);
        return {
            waiting: await queue.getWaiting(),
            active: await queue.getActive(),
            completed: await queue.getCompleted(),
            failed: await queue.getFailed(),
            delayed: await queue.getDelayed(),
            paused: await queue.isPaused(),
        };
    }

    async close(): Promise<void> {
        for (const queue of this.queues.values()) {
            await queue.close();
        }
        this.queues.clear();
    }
}

export const queueManager = new QueueManager();
