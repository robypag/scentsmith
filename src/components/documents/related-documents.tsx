"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { findRelatedDocuments } from "@/lib/actions/documents";

interface RelatedDocument {
    id: string;
    title: string;
    similarity: number;
    content: string;
    pageNumber: number;
}

interface RelatedDocumentsProps {
    documentId: string;
}

export function RelatedDocuments({ documentId }: RelatedDocumentsProps) {
    const [relatedDocs, setRelatedDocs] = useState<RelatedDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRelatedDocs = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const docs = await findRelatedDocuments(documentId, 3);
                setRelatedDocs(docs);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load related documents");
            } finally {
                setIsLoading(false);
            }
        };

        if (documentId) {
            loadRelatedDocs();
        }
    }, [documentId]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Related Documents</CardTitle>
                <CardDescription>Documents with similar content or regulations</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="p-4 text-center text-muted-foreground">
                        Loading related documents...
                    </div>
                ) : error ? (
                    <div className="p-4 text-center text-destructive text-sm">
                        {error}
                    </div>
                ) : relatedDocs.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                        No related documents found
                    </div>
                ) : (
                    <div className="space-y-3">
                        {relatedDocs.map((doc) => (
                            <div key={doc.id} className="p-3 border rounded-lg">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-medium text-sm truncate">{doc.title}</h5>
                                        <p className="text-xs text-muted-foreground mb-2">{doc.similarity}% similarity</p>
                                        <p className="text-xs text-muted-foreground line-clamp-2">{doc.content}</p>
                                        {doc.pageNumber && (
                                            <p className="text-xs text-muted-foreground mt-1">Page {doc.pageNumber}</p>
                                        )}
                                    </div>
                                    <Button variant="outline" size="sm" className="flex-shrink-0">
                                        View
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
