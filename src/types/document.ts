export interface Document {
    id: string;
    title: string;
    content: string;
    type: string;
    uploadedBy: string;
    fileUrl: string;
    metadata: {
        region?: string;
        authority?: string;
        version?: string;
        quarter?: string;
        supplier?: string;
        casNumber?: string;
    };
    tags: string[];
    embedding: null;
    createdAt: Date;
    updatedAt: Date;
}
