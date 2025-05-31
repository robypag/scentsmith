"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentBrowseTab, DocumentUploadTab, DocumentAnalyticsTab } from "@/components/documents/tabs";
import { useState } from "react";
import { loadDocuments } from "@/lib/actions/documents";
import { DocumentDTO } from "@/types/document";

interface DocumentsManagementProps {
    initialDocuments: DocumentDTO[];
}

export function DocumentsManagement({ initialDocuments }: DocumentsManagementProps) {
    const [documents, setDocuments] = useState<DocumentDTO[]>(initialDocuments);
    const [error, setError] = useState<string | null>(null);



    // Function to refresh documents after upload
    const refreshDocuments = async () => {
        try {
            const data = await loadDocuments();
            setDocuments(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to refresh documents");
        }
    };



    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gold">Document Management</h1>
                    <p className="text-muted-foreground">
                        Manage regulatory documents, safety data sheets, and research materials
                    </p>
                </div>
            </div>

            {error && (
                <div className="bg-destructive/15 border border-destructive/20 rounded-lg p-4">
                    <h2 className="text-destructive font-semibold mb-2">Error</h2>
                    <p className="text-destructive/80">{error}</p>
                </div>
            )}

            <Tabs defaultValue="browse" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="browse">Browse Documents</TabsTrigger>
                    <TabsTrigger value="upload">Upload New</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="browse" className="space-y-4">
                    <DocumentBrowseTab
                        documents={documents}
                    />
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                    <DocumentUploadTab onUploadSuccess={refreshDocuments} />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <DocumentAnalyticsTab documents={documents} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
