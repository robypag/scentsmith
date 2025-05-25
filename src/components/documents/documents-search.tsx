"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

interface DocumentsSearchProps {
    onSearch?: (searchTerm: string, typeFilter: string) => void;
}

export function DocumentsSearch({ onSearch }: DocumentsSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        onSearch?.(term, typeFilter);
    };

    const handleTypeFilterChange = (type: string) => {
        setTypeFilter(type);
        onSearch?.(searchTerm, type);
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-3">
                            <Label htmlFor="search-docs" className="text-sm font-medium">
                                Search Documents
                            </Label>
                            <div className="relative mt-1.5">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search-docs"
                                    placeholder="Search by title or content..."
                                    className="pl-10 bg-white dark:bg-gray-800 border-input"
                                    value={searchTerm}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <Label className="text-sm font-medium">Document Type</Label>
                            <div className="mt-1.5">
                                <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
                                    <SelectTrigger className="bg-white dark:bg-gray-800 border-input">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 border-input">
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="legal">Legal Documents</SelectItem>
                                        <SelectItem value="sds">Safety Data Sheets</SelectItem>
                                        <SelectItem value="formula">Formula Documents</SelectItem>
                                        <SelectItem value="research">Research Papers</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
