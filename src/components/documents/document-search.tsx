"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, HighlighterIcon } from "lucide-react";
import { useState } from "react";

interface DocumentSearchProps {
    onSearch?: (term: string) => void;
    onClearHighlights?: () => void;
}

export function DocumentSearch({ onSearch, onClearHighlights }: DocumentSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        onSearch?.(term);
    };

    const handleClearHighlights = () => {
        setSearchTerm("");
        onClearHighlights?.();
    };

    return (
        <div className="flex items-center gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search within document..."
                    className="pl-10 border-gold/30 focus-visible:ring-gold/30"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <Button variant="outline" size="sm" onClick={handleClearHighlights}>
                <HighlighterIcon className="w-3 h-3 mr-1" />
                Clear Highlights
            </Button>
        </div>
    );
}
