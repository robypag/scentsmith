"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockDocuments } from "@/lib/mock-data/expert-data";
import { DocumentBrowseTab, DocumentUploadTab, DocumentAnalyticsTab } from "@/components/documents/tabs";
import { getDocumentTypeBadge } from "@/lib/utils/document-badges";
import { useState, useMemo } from "react";

export default function DocumentsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const filteredDocuments = useMemo(() => {
        return mockDocuments.filter((doc) => {
            const matchesSearch =
                doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = typeFilter === "all" || doc.type === typeFilter;
            return matchesSearch && matchesType;
        });
    }, [searchTerm, typeFilter]);

    const handleSearch = (search: string, type: string) => {
        setSearchTerm(search);
        setTypeFilter(type);
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
                    />
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                    <DocumentUploadTab />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <DocumentAnalyticsTab documents={mockDocuments} getDocumentTypeBadge={getDocumentTypeBadge} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
