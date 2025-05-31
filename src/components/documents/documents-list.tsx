import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { DocumentDTO } from "@/types/document";
import { DocumentCard } from "./document-card";
import React from "react";

interface DocumentsListProps {
    documents: DocumentDTO[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents.map((document) => (
                    <DocumentCard key={document.id} document={document} />
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
