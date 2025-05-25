import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Download, Calendar, Tag, FileText } from "lucide-react";
import { Document } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";

interface DocumentsListProps {
    documents: Document[];
    getDocumentTypeBadge: (type: string) => React.ReactElement;
}

export function DocumentsList({ documents, getDocumentTypeBadge }: DocumentsListProps) {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents.map((document) => (
                    <Card key={document.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="space-y-1">
                                <CardTitle className="text-lg">{document.title}</CardTitle>
                                <CardDescription className="text-sm">
                                    {document.tags?.join(", ") || "No tags"}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {document.content.substring(0, 150)}...
                            </p>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(document.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Tag className="w-3 h-3" />
                                    {document.tags?.length || 0} tags
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <div className="flex items-center justify-between w-full gap-2">
                                <div className="flex-shrink-0">
                                    {getDocumentTypeBadge(document.type)}
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/documents/${document.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="w-3 h-3 mr-1" />
                                            View
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm">
                                        <Download className="w-3 h-3 mr-1" />
                                        Download
                                    </Button>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {documents.length === 0 && (
                <Card>
                    <CardContent className="p-6 text-center">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No documents found matching your criteria.</p>
                    </CardContent>
                </Card>
            )}
        </>
    );
}
