"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { performSemanticSearch } from "@/lib/actions/documents";

interface SearchResult {
    content: string;
    topics: string[];
    tags: string[];
    chemicals: string[];
    pageNumber: number;
    documentTitle: string;
    similarity: number;
}

interface RelatedDocumentsProps {
    documentId: string;
}

export function SemanticSearch({ documentId }: RelatedDocumentsProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [expandedResults, setExpandedResults] = useState<Set<number>>(new Set());

    const handleSemanticSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setError(null);

        try {
            const results = await performSemanticSearch(searchQuery.trim(), 5, documentId);
            setSearchResults(results);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to perform semantic search");
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleBadgeClick = (query: string) => {
        setSearchQuery(query);
    };

    const toggleResultExpansion = (index: number) => {
        const newExpanded = new Set(expandedResults);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedResults(newExpanded);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Semantic Search</CardTitle>
                <CardDescription>
                    Search for concepts and meaning within this document using AI-powered vector search
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Ask about ingredients, regulations, safety concerns..."
                        className="border-gold/30 focus-visible:ring-gold/30"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSemanticSearch()}
                    />
                    <Button
                        className="bg-gold text-gold-foreground hover:bg-gold/90"
                        onClick={handleSemanticSearch}
                        disabled={isSearching || !searchQuery.trim()}
                    >
                        <Search className="w-4 h-4 mr-2" />
                        {isSearching ? "Searching..." : "Search"}
                    </Button>
                </div>

                {error && (
                    <div className="p-3 bg-destructive/15 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive">{error}</p>
                    </div>
                )}

                {searchResults.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm">Search Results</h4>
                        {searchResults.map((result, index) => (
                            <div key={index} className="p-3 border rounded-lg bg-muted/30">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h5 className="font-medium text-sm">{result.documentTitle}</h5>
                                        <div className="text-right">
                                            {result.pageNumber && (
                                                <div className="text-xs text-muted-foreground">
                                                    Page {result.pageNumber}
                                                </div>
                                            )}
                                            <div className="text-xs text-muted-foreground">
                                                {Math.round(result.similarity * 100)}% match
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => toggleResultExpansion(index)}
                                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {expandedResults.has(index) ? (
                                                <ChevronDown className="w-3 h-3" />
                                            ) : (
                                                <ChevronRight className="w-3 h-3" />
                                            )}
                                            {expandedResults.has(index) ? "Collapse" : "Expand"} content
                                        </button>
                                        <p
                                            className={`text-sm text-muted-foreground ${
                                                expandedResults.has(index) ? "" : "line-clamp-3"
                                            }`}
                                        >
                                            {result.content}
                                        </p>
                                    </div>
                                    {(result.topics.length > 0 || result.tags.length > 0) && (
                                        <div className="flex flex-wrap gap-1">
                                            {result.topics.map((topic, i) => (
                                                <Badge key={`topic-${i}`} variant="outline" className="text-xs">
                                                    {topic}
                                                </Badge>
                                            ))}
                                            {result.tags.map((tag, i) => (
                                                <Badge key={`tag-${i}`} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-sm text-muted-foreground">
                    <p className="mb-2">Try searching for:</p>
                    <div className="flex flex-wrap gap-2">
                        <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-gold/10"
                            onClick={() => handleBadgeClick("concentration limits")}
                        >
                            concentration limits
                        </Badge>
                        <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-gold/10"
                            onClick={() => handleBadgeClick("safety requirements")}
                        >
                            safety requirements
                        </Badge>
                        <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-gold/10"
                            onClick={() => handleBadgeClick("allergen restrictions")}
                        >
                            allergen restrictions
                        </Badge>
                        <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-gold/10"
                            onClick={() => handleBadgeClick("IFRA standards")}
                        >
                            IFRA standards
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
