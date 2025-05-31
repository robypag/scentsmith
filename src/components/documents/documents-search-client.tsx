"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function DocumentsSearchClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
    const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || "all");

    const handleSearch = () => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            
            if (searchTerm.trim()) {
                params.set('search', searchTerm.trim());
            } else {
                params.delete('search');
            }
            
            if (typeFilter !== 'all') {
                params.set('type', typeFilter);
            } else {
                params.delete('type');
            }
            
            router.push(`/documents?${params.toString()}`);
        });
    };

    const handleClear = () => {
        setSearchTerm("");
        setTypeFilter("all");
        startTransition(() => {
            router.push('/documents');
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex gap-4 items-end">
            <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium mb-2">
                    Search Documents
                </label>
                <div className="relative">
                    <Input
                        id="search"
                        placeholder="Search by title or content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-10"
                    />
                    {searchTerm && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-auto p-1"
                            onClick={() => setSearchTerm("")}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            <div className="min-w-[140px]">
                <label htmlFor="type-filter" className="block text-sm font-medium mb-2">
                    Document Type
                </label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger id="type-filter">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="sds">SDS</SelectItem>
                        <SelectItem value="formula">Formula</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button onClick={handleSearch} disabled={isPending} className="mb-0">
                <Search className="w-4 h-4 mr-2" />
                {isPending ? "Searching..." : "Search"}
            </Button>

            {(searchTerm || typeFilter !== 'all') && (
                <Button variant="outline" onClick={handleClear} disabled={isPending}>
                    Clear
                </Button>
            )}
        </div>
    );
}