"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function SemanticSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleSemanticSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        // TODO: Implement actual semantic search with vector embeddings
        setTimeout(() => {
            setIsSearching(false);
        }, 1000);
    };

    const handleBadgeClick = (query: string) => {
        setSearchQuery(query);
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
