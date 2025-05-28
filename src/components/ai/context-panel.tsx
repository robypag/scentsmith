"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAIContextStore } from "@/stores/ai-context";
import { X, FlaskConical, Droplets, FileText, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ContextPanelProps {
    className?: string;
}

export function ContextPanel({ className }: ContextPanelProps) {
    const { items, removeContext, clearContext, getContextSummary } = useAIContextStore();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const getEntityIcon = (type: string) => {
        switch (type) {
            case "formula":
                return <FlaskConical className="h-4 w-4" />;
            case "ingredient":
                return <Droplets className="h-4 w-4" />;
            case "document":
                return <FileText className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    const getEntityBadgeVariant = (type: string) => {
        switch (type) {
            case "formula":
                return "default";
            case "ingredient":
                return "secondary";
            case "document":
                return "outline";
            default:
                return "outline";
        }
    };

    const formatAddedTime = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
        return date.toLocaleDateString();
    };

    if (items.length === 0) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <FlaskConical className="h-5 w-5" />
                            <span>AI Context</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="h-8 w-8 p-0"
                        >
                            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                        </Button>
                    </CardTitle>
                </CardHeader>
                {!isCollapsed && (
                    <CardContent>
                        <div className="text-center py-2">
                            <div className="text-muted-foreground mb-2">No context items</div>
                            <p className="text-sm text-muted-foreground">
                                Select formulae or other items to add them to your AI context for enhanced assistance.
                            </p>
                        </div>
                    </CardContent>
                )}
            </Card>
        );
    }

    return (
        <Card className={className}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                        <FlaskConical className="h-5 w-5" />
                        <span>AI Context</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                            {items.length} item{items.length !== 1 ? "s" : ""}
                        </Badge>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearContext}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="h-8 w-8 p-0"
                        >
                            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
                {!isCollapsed && <p className="text-sm text-muted-foreground">{getContextSummary()}</p>}
            </CardHeader>
            {!isCollapsed && (
                <CardContent>
                    <ScrollArea>
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start justify-between p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                                >
                                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                                        <div className="flex-shrink-0 mt-0.5">{getEntityIcon(item.entity.type)}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h4 className="font-medium text-sm truncate">{item.entity.name}</h4>
                                                <Badge
                                                    variant={getEntityBadgeVariant(item.entity.type)}
                                                    className="text-xs"
                                                >
                                                    {item.entity.type}
                                                </Badge>
                                            </div>
                                            {item.entity.description && (
                                                <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                                                    {item.entity.description}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">
                                                    {formatAddedTime(item.addedAt)}
                                                </span>
                                                {item.source && (
                                                    <span className="text-xs text-muted-foreground">
                                                        via {item.source}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeContext(item.id)}
                                        className="h-8 w-8 p-0 flex-shrink-0 ml-2 text-muted-foreground hover:text-destructive"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            )}
        </Card>
    );
}
