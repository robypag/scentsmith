import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Download, Calendar, Tag, Trash2 } from "lucide-react";
import { DocumentDTO } from "@/types/document";
import Link from "next/link";
import React from "react";

interface DocumentCardProps {
    document: DocumentDTO;
    getDocumentTypeBadge: (type: string) => React.ReactElement;
    onDelete: (documentId: string) => void;
}

export function DocumentCard({ document, getDocumentTypeBadge, onDelete }: DocumentCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
            <CardHeader>
                <div className="space-y-1">
                    <CardTitle className="text-lg">{document.title}</CardTitle>
                    <CardDescription className="text-sm">
                        <div className="flex-shrink-0">{getDocumentTypeBadge(document.type)}</div>
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-4">
                    {document.summarization ?? "No summary available"}...
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(document.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {document.tags || "No Tags"}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="pt-0 mt-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2">
                    <div className="flex gap-2 flex-shrink-0">
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
                        <Button variant="destructive" size="sm" onClick={() => onDelete(document.id)}>
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
