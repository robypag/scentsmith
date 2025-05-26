"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockDocuments } from "@/lib/mock-data/expert-data";
import { DocumentBrowseTab, DocumentUploadTab, DocumentAnalyticsTab } from "@/components/documents/tabs";
import { getDocumentTypeBadge } from "@/components/documents/document-badges";
import { useState, useMemo, useEffect } from "react";
import { loadDocuments, deleteDocument } from "@/lib/actions/documents";
import { DocumentDTO } from "@/types/document";
import { Loader2 } from "lucide-react";

export default function DocumentsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [documents, setDocuments] = useState<DocumentDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load documents on component mount
    useEffect(() => {
        async function fetchDocuments() {
            try {
                setIsLoading(true);
                setError(null);
                const data = await loadDocuments();
                setDocuments(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load documents");
            } finally {
                setIsLoading(false);
            }
        }

        fetchDocuments();
    }, []);

    const filteredDocuments = useMemo(() => {
        return documents.filter((doc) => {
            const matchesSearch =
                doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.summarization?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = typeFilter === "all" || doc.type === typeFilter;
            return matchesSearch && matchesType;
        });
    }, [documents, searchTerm, typeFilter]);

    const handleSearch = (search: string, type: string) => {
        setSearchTerm(search);
        setTypeFilter(type);
    };

    // Function to refresh documents after upload
    const refreshDocuments = async () => {
        try {
            const data = await loadDocuments();
            setDocuments(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to refresh documents");
        }
    };

    // Function to handle document deletion
    const handleDelete = async (documentId: string) => {
        try {
            await deleteDocument(documentId);
            await refreshDocuments(); // Refresh the list after deletion
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete document");
        }
    };

    if (isLoading) {
        return (
            <div className="p-4 flex items-center justify-center min-h-96">
                <div className="flex items-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading documents...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="bg-destructive/15 border border-destructive/20 rounded-lg p-4">
                    <h2 className="text-destructive font-semibold mb-2">Error Loading Documents</h2>
                    <p className="text-destructive/80">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

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

            <Tabs defaultValue="browse" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="browse">Browse Documents</TabsTrigger>
                    <TabsTrigger value="upload">Upload New</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="browse" className="space-y-4">
                    <DocumentBrowseTab
                        filteredDocuments={filteredDocuments}
                        getDocumentTypeBadge={getDocumentTypeBadge}
                        onSearch={handleSearch}
                        onDelete={handleDelete}
                    />
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                    <DocumentUploadTab onUploadSuccess={refreshDocuments} />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <DocumentAnalyticsTab documents={mockDocuments} getDocumentTypeBadge={getDocumentTypeBadge} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
