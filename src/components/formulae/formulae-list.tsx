"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormulaDTO } from "@/types/formula";
import { FormulaCard } from "./formula-card";
import { Search, Grid, List, Bot, CheckSquare, Square, Plus } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAIContextStore, formulaToAIContext } from "@/stores/ai-context";
import { useRightSidebar } from "@/hooks/use-sidebar-states";

interface FormulaeListProps {
    formulae: FormulaDTO[];
    showSearch?: boolean;
    showFilters?: boolean;
    allowMultiSelect?: boolean;
}

export function FormulaeList({
    formulae,
    showSearch = true,
    showFilters = true,
    allowMultiSelect = false,
}: FormulaeListProps) {
    const router = useRouter();
    const { addContext } = useAIContextStore();
    const { setIsOpen: setRightSidebarOpen } = useRightSidebar();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("name");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedFormulae, setSelectedFormulae] = useState<Set<string>>(new Set());

    const filteredAndSortedFormulae = useMemo(() => {
        const filtered = formulae.filter((formula) => {
            const matchesSearch =
                formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                formula.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "all" || formula.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "created":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case "version":
                    const bVersion = typeof b.version === "string" ? parseInt(b.version) || 0 : b.version || 0;
                    const aVersion = typeof a.version === "string" ? parseInt(a.version) || 0 : a.version || 0;
                    return bVersion - aVersion;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [formulae, searchTerm, statusFilter, sortBy]);

    const handleSelectFormula = (formulaId: string) => {
        if (allowMultiSelect) {
            const newSelected = new Set(selectedFormulae);
            if (newSelected.has(formulaId)) {
                newSelected.delete(formulaId);
            } else {
                newSelected.add(formulaId);
            }
            setSelectedFormulae(newSelected);
        } else {
            router.push(`/formulae/${formulaId}`);
        }
    };

    const handleSelectAll = () => {
        if (selectedFormulae.size === filteredAndSortedFormulae.length) {
            setSelectedFormulae(new Set());
        } else {
            setSelectedFormulae(new Set(filteredAndSortedFormulae.map((f) => f.id)));
        }
    };

    const handleAskAIWithSelected = () => {
        const selectedFormulaeData = formulae.filter((f) => selectedFormulae.has(f.id));
        selectedFormulaeData.forEach((formula) => {
            const contextEntity = formulaToAIContext(formula);
            addContext(contextEntity, "formula-list");
        });
        setRightSidebarOpen(true);
    };

    const isAllSelected =
        selectedFormulae.size === filteredAndSortedFormulae.length && filteredAndSortedFormulae.length > 0;
    const isSomeSelected = selectedFormulae.size > 0 && selectedFormulae.size < filteredAndSortedFormulae.length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gold">Formulae Management</h1>
                    <p className="text-muted-foreground">Manage your formulae catalogue</p>
                </div>
                <div className="flex items-center space-x-2">
                    {allowMultiSelect && selectedFormulae.size > 0 && (
                        <Button onClick={handleAskAIWithSelected} variant="outline">
                            <Bot className="h-4 w-4 mr-2" />
                            Ask AI ({selectedFormulae.size})
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                    >
                        {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                    </Button>
                    <Button
                        className="bg-gold text-gold-foreground hover:bg-gold/90"
                        onClick={() => router.push("/formulae/create")}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Formula
                    </Button>
                </div>
            </div>

            {(showSearch || showFilters) && (
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                            {showSearch && (
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search formulae..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                </div>
                            )}

                            {showFilters && (
                                <div className="flex space-x-2">
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="name">Name</SelectItem>
                                            <SelectItem value="created">Created</SelectItem>
                                            <SelectItem value="version">Version</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {allowMultiSelect && filteredAndSortedFormulae.length > 0 && (
                            <div className="flex items-center justify-between pt-4 border-t mt-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSelectAll}
                                    className="flex items-center space-x-2"
                                >
                                    {isAllSelected ? (
                                        <CheckSquare className="h-4 w-4" />
                                    ) : isSomeSelected ? (
                                        <Square className="h-4 w-4 opacity-50" />
                                    ) : (
                                        <Square className="h-4 w-4" />
                                    )}
                                    <span>{isAllSelected ? "Deselect All" : "Select All"}</span>
                                </Button>

                                {selectedFormulae.size > 0 && (
                                    <div className="text-sm text-muted-foreground">
                                        {selectedFormulae.size} formulae selected
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {filteredAndSortedFormulae.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">No formulae found</h3>
                            <p className="text-muted-foreground mb-4">
                                {searchTerm || statusFilter !== "all"
                                    ? "Try adjusting your search or filters"
                                    : "Get started by creating your first formula"}
                            </p>
                            <Link href="/formulae/new">
                                <Button>Create Formula</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div
                    className={
                        viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"
                    }
                >
                    {filteredAndSortedFormulae.map((formula) => (
                        <FormulaCard
                            key={formula.id}
                            formula={formula}
                            variant={viewMode === "list" ? "compact" : "default"}
                            isSelected={selectedFormulae.has(formula.id)}
                            onSelect={handleSelectFormula}
                            showActions={!allowMultiSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
