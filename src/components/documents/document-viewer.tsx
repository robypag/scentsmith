"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { DocumentSearch } from "./document-search";
import { DocumentContent } from "./document-content";
import { RelatedDocuments } from "./related-documents";
import { SemanticSearch } from "./semantic-search";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentDTO } from "@/types/document";

interface DocumentViewerProps {
    document: DocumentDTO;
    onClose?: () => void;
}

export function DocumentViewer({ document, onClose }: DocumentViewerProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleClearHighlights = () => {
        setSearchTerm("");
    };

    const handleBack = () => {
        if (onClose) {
            onClose();
        } else {
            router.push("/documents");
        }
    };

    const getDocumentTypeBadge = (type: string) => {
        switch (type) {
            case "legal":
                return (
                    <Badge className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200">
                        Legal
                    </Badge>
                );
            case "sds":
                return (
                    <Badge className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800">
                        SDS
                    </Badge>
                );
            case "formula":
                return <Badge className="bg-gold text-gold-foreground hover:bg-gold/80">Formula</Badge>;
            case "research":
                return (
                    <Badge className="bg-pink-200 text-pink-800 hover:bg-pink-300 dark:bg-pink-800 dark:text-pink-200">
                        Research
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{type}</Badge>;
        }
    };

    return (
        <div className="h-full flex flex-col">
            <Card className="flex-1 flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gold" />
                                <CardTitle className="text-xl">{document.title}</CardTitle>
                                {getDocumentTypeBadge(document.type)}
                            </div>
                            <CardDescription>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(document.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        Uploaded by {document.uploadedBy || "Anonymous"}
                                    </span>
                                </div>
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleBack}>
                                <ArrowLeft className="w-3 h-3 mr-1" />
                                Back
                            </Button>
                            <Button variant="outline" size="sm">
                                <Download className="w-3 h-3 mr-1" />
                                Download
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <Separator />

                <div className="flex-1 flex flex-col min-h-0">
                    <Tabs defaultValue="content" className="flex-1 flex flex-col">
                        <div className="flex-shrink-0 px-6 pt-4">
                            <TabsList>
                                <TabsTrigger value="content">Summary</TabsTrigger>
                                <TabsTrigger value="metadata">Metadata</TabsTrigger>
                                <TabsTrigger value="search">Semantic Search</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="content" className="flex-1 flex flex-col px-6 pb-6 mt-4">
                            <div className="space-y-4 flex-1 flex flex-col">
                                <DocumentSearch onSearch={handleSearch} onClearHighlights={handleClearHighlights} />
                                <DocumentContent
                                    content={document.summarization ?? "No summary available"}
                                    searchTerm={searchTerm}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="metadata" className="flex-1 px-6 pb-6 mt-4">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-medium mb-3">Document Information</h4>
                                    <div className="grid gap-3 text-sm">
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="font-medium">Title</span>
                                            <span>{document.title}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="font-medium">Type</span>
                                            <span>{document.type.toUpperCase()}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="font-medium">Created</span>
                                            <span>{new Date(document.createdAt).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="font-medium">Last Updated</span>
                                            <span>{new Date(document.updatedAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {document.tags && document.tags.length > 0 && (
                                    <div>
                                        <h4 className="font-medium mb-3 flex items-center gap-2">
                                            <Tag className="w-4 h-4" />
                                            Tags
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {document.tags.split(",").map((tag, index) => (
                                                <Badge key={index} variant="outline">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="search" className="flex-1 px-6 pb-6 mt-4">
                            <div className="space-y-4">
                                <SemanticSearch />
                                <RelatedDocuments />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </Card>
        </div>
    );
}
