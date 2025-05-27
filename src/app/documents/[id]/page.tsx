import { notFound } from "next/navigation";
import { DocumentViewer } from "@/components/documents/document-viewer";
import { mockDocuments } from "@/lib/mock-data/expert-data";
import { loadDocument } from "@/lib/actions/documents";

interface DocumentPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function DocumentPage({ params }: DocumentPageProps) {
    const { id } = await params;
    
    // First try to find in mock data (for development/demo)
    const mockDocument = mockDocuments.find((doc) => doc.id === id);
    if (mockDocument) {
        return <DocumentViewer document={{ ...mockDocument, tags: mockDocument.tags?.join(',') || '' }} />;
    }
    
    // If not found in mock data, try database (for real documents)
    try {
        const document = await loadDocument(id);
        if (!document) {
            notFound();
        }
        return <DocumentViewer document={document} />;
    } catch (error) {
        // If database error (e.g., invalid UUID), treat as not found
        console.warn('Error loading document:', error);
        notFound();
    }
}

export async function generateStaticParams() {
    return mockDocuments.map((document) => ({
        id: document.id,
    }));
}

export async function generateMetadata({ params }: DocumentPageProps) {
    const { id } = await params;
    const document = mockDocuments.find((doc) => doc.id === id);

    if (!document) {
        return {
            title: "Document Not Found",
        };
    }

    return {
        title: `${document.title} | SmellSmith`,
        description: `${document.type.toUpperCase()} document: ${document.title}`,
    };
}
