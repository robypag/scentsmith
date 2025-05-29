"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Eye, Edit, Trash2, Bot } from "lucide-react";
import { Ingredient } from "@/lib/db/schema";
import { deleteIngredient } from "@/lib/actions/ingredients";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRightSidebar } from "@/hooks/use-sidebar-states";
import { useAIContextStore, ingredientToAIContext } from "@/stores/ai-context";
import { cn } from "@/lib/utils";

interface IngredientCardProps {
    ingredient: Ingredient;
    className?: string;
    isSelected?: boolean;
    onSelect?: (ingredientId: string) => void;
}

export function IngredientCard({ ingredient, className, isSelected, onSelect }: IngredientCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const { setIsOpen: setRightSidebarOpen } = useRightSidebar();
    const { addContext, hasEntity } = useAIContextStore();

    const isInContext = hasEntity(ingredient.id);

    const handleAskAI = () => {
        const contextEntity = ingredientToAIContext(ingredient);
        addContext(contextEntity, "ingredient-card");
        setRightSidebarOpen(true);
    };

    const handleCardClick = () => {
        if (onSelect) {
            onSelect(ingredient.id);
        }
    };

    const getVolatilityBadge = (volatility: string | null) => {
        switch (volatility) {
            case "top":
                return (
                    <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-800 dark:text-sky-200">
                        Top Note
                    </Badge>
                );
            case "middle":
                return (
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">
                        Middle Note
                    </Badge>
                );
            case "base":
                return (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-200">
                        Base Note
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{volatility || "Unknown"}</Badge>;
        }
    };

    const getSafetyLevel = (safetyNotes: string | null) => {
        if (!safetyNotes)
            return (
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">
                    Low Risk
                </Badge>
            );

        if (safetyNotes.toLowerCase().includes("phototoxic") || safetyNotes.toLowerCase().includes("allergen")) {
            return (
                <Badge variant="destructive">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    High Risk
                </Badge>
            );
        } else if (
            safetyNotes.toLowerCase().includes("sparingly") ||
            safetyNotes.toLowerCase().includes("sensitizer")
        ) {
            return (
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-800 dark:text-amber-200">
                    Medium Risk
                </Badge>
            );
        } else {
            return (
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">
                    Low Risk
                </Badge>
            );
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await deleteIngredient(id);
            if (result.success) {
                toast.success("Ingredient deleted successfully");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to delete ingredient");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card
            key={ingredient.id}
            className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                isSelected && "ring-2 ring-primary",
                isInContext && "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
                className,
            )}
            onClick={handleCardClick}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">{ingredient.name}</CardTitle>
                        <CardDescription className="text-sm">CAS: {ingredient.casNumber || "N/A"}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-1">
                        {getVolatilityBadge(ingredient.volatility)}
                        {getSafetyLevel(ingredient.safetyNotes)}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {ingredient.odorProfile || "No odor profile available"}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                        <span className="font-medium">IFRA Category:</span>
                        <br />
                        {ingredient.ifraCategory || "N/A"}
                    </div>
                    <div>
                        <span className="font-medium">Max Conc:</span>
                        <br />
                        {ingredient.maxConcentration ? `${ingredient.maxConcentration}%` : "N/A"}
                    </div>
                    <div>
                        <span className="font-medium">Supplier:</span>
                        <br />
                        {ingredient.supplier || "N/A"}
                    </div>
                    <div>
                        <span className="font-medium">Cost:</span>
                        <br />${ingredient.cost ? parseFloat(ingredient.cost).toFixed(2) : "0.00"}
                        /kg
                    </div>
                </div>

                <div className="p-2 bg-amber-50 rounded-md dark:bg-amber-900/30 h-[60px]">
                    <div className="text-xs font-medium text-amber-800 dark:text-amber-200 mb-1">Safety Notes:</div>
                    <div className="text-xs text-amber-700 dark:text-amber-300 line-clamp-2">
                        {ingredient.safetyNotes || "No specific safety concerns noted."}
                    </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => router.push(`/ingredients/${ingredient.id}`)}
                        >
                            <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => router.push(`/ingredients/${ingredient.id}/edit`)}
                        >
                            <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="px-2"
                            onClick={() => handleDelete(ingredient.id, ingredient.name)}
                            disabled={isDeleting}
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
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
            </CardContent>
        </Card>
    );
}
