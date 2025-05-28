"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormulaDTO } from "@/types/formula";
import { Calendar, AlertTriangle, CheckCircle, Clock, Eye, Edit, Bot, Trash2 } from "lucide-react";
import Link from "next/link";
import { useAIContextStore, formulaToAIContext } from "@/stores/ai-context";
import { cn } from "@/lib/utils";
import { useRightSidebar } from "@/hooks/use-sidebar-states";

interface FormulaCardProps {
    formula: FormulaDTO;
    showActions?: boolean;
    className?: string;
    variant?: "default" | "compact";
    isSelected?: boolean;
    onSelect?: (formulaId: string) => void;
}

export function FormulaCard({
    formula,
    showActions = true,
    className,
    variant = "default",
    isSelected = false,
    onSelect,
}: FormulaCardProps) {
    const { addContext, hasEntity } = useAIContextStore();
    const { setIsOpen: setRightSidebarOpen } = useRightSidebar();

    const isInContext = hasEntity(formula.id);

    const handleAskAI = () => {
        const contextEntity = formulaToAIContext({
            id: formula.id,
            name: formula.name,
            description: formula.description || undefined,
            status: formula.status || undefined,
            version: typeof formula.version === "string" ? parseInt(formula.version) || 0 : formula.version || 0,
            createdAt: formula.createdAt.toISOString(),
            ingredients: formula.ingredients || [],
        });
        addContext(contextEntity, "formula-card");
        setRightSidebarOpen(true);
    };

    const handleCardClick = () => {
        if (onSelect) {
            onSelect(formula.id);
        }
    };

    const getStatusIcon = () => {
        switch (formula.status) {
            case "active":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "draft":
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case "archived":
                return <AlertTriangle className="h-4 w-4 text-gray-500" />;
            default:
                return null;
        }
    };

    const getStatusBadgeVariant = () => {
        switch (formula.status) {
            case "active":
                return "default";
            case "draft":
                return "secondary";
            case "archived":
                return "outline";
            default:
                return "outline";
        }
    };

    if (variant === "compact") {
        return (
            <Card
                className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    isSelected && "ring-2 ring-primary",
                    isInContext && "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
                    className,
                )}
                onClick={handleCardClick}
            >
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 gap-2">
                            {getStatusIcon()}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{formula.name}</h3>
                                <p className="text-sm text-muted-foreground truncate">{formula.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge variant={getStatusBadgeVariant()}>{formula.status}</Badge>
                            {showActions && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAskAI();
                                    }}
                                    className={cn(
                                        "h-8 w-8 p-0",
                                        isInContext && "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
                                    )}
                                >
                                    <Bot className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                isSelected && "ring-2 ring-primary",
                isInContext && "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
                className,
            )}
            onClick={handleCardClick}
        >
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                        <div className="flex items-center space-x-2">
                            {getStatusIcon()}
                            <CardTitle className="text-lg">{formula.name}</CardTitle>
                        </div>
                        {formula.description && (
                            <CardDescription className="text-sm">{formula.description}</CardDescription>
                        )}
                    </div>
                    <Badge variant={getStatusBadgeVariant()}>{formula.status}</Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>v{formula.version}</span>
                    </div>
                    <span>{new Date(formula.createdAt).toLocaleDateString()}</span>
                </div>

                {formula.ingredients && formula.ingredients.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Ingredients ({formula.ingredients.length})</h4>
                        <div className="flex flex-wrap gap-1">
                            {formula.ingredients.slice(0, 3).map((formulaIngredient, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    {formulaIngredient.ingredient.name}
                                </Badge>
                            ))}
                            {formula.ingredients.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{formula.ingredients.length - 3} more
                                </Badge>
                            )}
                        </div>
                    </div>
                )}

                {showActions && (
                    <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex space-x-2">
                            <Link href={`/formulae/${formula.id}`}>
                                <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href={`/formulae/${formula.id}/edit`}>
                                <Button size="sm" variant="outline">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="px-2"
                                onClick={() => ({})} // TODO: Implement delete functionality
                                disabled={false}
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
                )}
            </CardContent>
        </Card>
    );
}
