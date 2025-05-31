import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Download, Calendar, Tag, Bot } from "lucide-react";
import { DocumentDTO } from "@/types/document";
import { getDocumentTypeBadge } from "./document-badges";
import { DocumentDeleteButton } from "./document-delete-button";
import Link from "next/link";
import React from "react";
import { useAIContextStore, documentToAIContext } from "@/stores/ai-context";
import { useRightSidebar } from "@/hooks/use-sidebar-states";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
    document: DocumentDTO;
    className?: string;
    isSelected?: boolean;
    onSelect?: (ingredientId: string) => void;
}

export function DocumentCard({ document, className, isSelected, onSelect }: DocumentCardProps) {
    const { setIsOpen: setRightSidebarOpen } = useRightSidebar();
    const { addContext, hasEntity } = useAIContextStore();
    const isInContext = hasEntity(document.id);

    const handleAskAI = () => {
        const contextEntity = documentToAIContext(document);
        addContext(contextEntity, "document-card");
        setRightSidebarOpen(true);
    };

    const handleCardClick = () => {
        if (onSelect) {
            onSelect(document.id);
        }
    };

    return (
        <Card
            key={document.id}
            className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                isSelected && "ring-2 ring-primary",
                isInContext && "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
                className,
            )}
            onClick={handleCardClick}
        >
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
                        {new Date(document.createdAt).toLocaleDateString("it-IT")}
                    </span>
                    <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {document.tags?.join(",") || "No Tags"}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="pt-0 mt-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2">
                    <div className="flex gap-2 flex-shrink-0">
                        <Link href={`/documents/${document.id}`}>
                            <Button variant="outline" size="sm">
                                <Eye className="w-3 h-3 mr-1" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                            <Download className="w-3 h-3 mr-1" />
                        </Button>
                        <DocumentDeleteButton documentId={document.id} />
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAskAI();
                            }}
                            className={cn(
                                isInContext &&
                                    "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700",
                            )}
                        >
                            <Bot className="h-4 w-4 mr-1" />
                            Ask AI
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
