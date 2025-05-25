"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";

interface DocumentContentProps {
    content: string;
    searchTerm?: string;
}

export function DocumentContent({ content, searchTerm }: DocumentContentProps) {
    const [highlightedContent, setHighlightedContent] = useState(content);

    useEffect(() => {
        if (!searchTerm || searchTerm.trim() === "") {
            setHighlightedContent(content);
            return;
        }

        // Simple highlighting - in a real app, this would use vector search
        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        const highlighted = content.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
        setHighlightedContent(highlighted);
    }, [content, searchTerm]);

    return (
        <ScrollArea className="flex-1 rounded-md border p-4">
            <div
                className="prose prose-sm max-w-none text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightedContent }}
            />
        </ScrollArea>
    );
}
