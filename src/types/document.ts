export interface DocumentDTO {
    id: string;
    title: string;
    type: string;
    summarization: string | null;
    tags: string | undefined;
    uploadedBy: string;
    updatedAt: Date;
    createdAt: Date;
}
