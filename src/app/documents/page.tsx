import { Suspense } from "react";
import type { Metadata } from "next";
import { loadDocuments } from "@/lib/actions/documents";
import { DocumentsManagement } from "@/components/documents/documents-management";
import { DocumentsPageSkeleton } from "@/components/skeletons/documents-page-skeleton";

export const metadata: Metadata = {
    title: "Document Management - SmellSmith",
    description: "Manage regulatory documents, safety data sheets, and research materials for your fragrance formulations.",
    openGraph: {
        title: "Document Management - SmellSmith",
        description: "Centralized document management for fragrance development and compliance.",
        type: "website",
    },
};

async function DocumentsContent() {
    const documents = await loadDocuments();
    return <DocumentsManagement initialDocuments={documents} />;
}

export default function DocumentsPage() {
    return (
        <Suspense fallback={<DocumentsPageSkeleton />}>
            <DocumentsContent />
        </Suspense>
    );
}