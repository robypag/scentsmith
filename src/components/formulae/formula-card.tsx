"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormulaDTO } from "@/types/formula";
import { Calendar, AlertTriangle, CheckCircle, Clock, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

interface FormulaCardProps {
    formula: FormulaDTO;
    onEdit?: (formulaId: string) => void;
    onDelete?: (formulaId: string) => void;
}

export function FormulaCard({ formula, onEdit, onDelete }: FormulaCardProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved":
                return (
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                    </Badge>
                );
            case "testing":
                return (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-800 dark:text-amber-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Testing
                    </Badge>
                );
            case "draft":
                return (
                    <Badge variant="secondary">
                        <Edit className="w-3 h-3 mr-1" />
                        Draft
                    </Badge>
                );
            case "archived":
                return <Badge variant="outline">Archived</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getComplianceBadge = (isCompliant: boolean) => {
        return isCompliant ? (
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">
                Compliant
            </Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800 dark:text-red-200">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Non-Compliant
            </Badge>
        );
    };

    const expirationDate = formula.expirationDate ? new Date(formula.expirationDate) : null;
    const isExpiringSoon = expirationDate && expirationDate < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

    return (
        <Card className="hover:shadow-md transition-shadow flex flex-col h-full">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">{formula.name}</CardTitle>
                        <CardDescription className="text-sm">
                            Version {formula.version} • {formula.ingredients.length} ingredients
                        </CardDescription>
                    </div>
                    <div className="flex flex-col gap-1">
                        {getStatusBadge(formula.status ?? "")}
                        {getComplianceBadge(formula.isCompliant ?? false)}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground line-clamp-2">{formula.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                        <span className="font-medium">Concentration:</span>
                        <br />
                        {formula.totalConcentration}%
                    </div>
                    <div>
                        <span className="font-medium">Batch Size:</span>
                        <br />
                        {formula.batchSize}g
                    </div>
                </div>

                {expirationDate && (
                    <div
                        className={`flex items-center gap-2 text-xs p-2 rounded-md ${
                            isExpiringSoon
                                ? "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                : "bg-muted text-muted-foreground"
                        }`}
                    >
                        <Calendar className="w-3 h-3" />
                        <span>
                            Expires: {expirationDate.toLocaleDateString()}
                            {isExpiringSoon && " (Soon)"}
                        </span>
                    </div>
                )}

                <div className="space-y-2 flex-1">
                    <div className="text-xs font-medium">Key Ingredients:</div>
                    <div className="flex flex-wrap gap-1">
                        {formula.ingredients.slice(0, 3).map((formulaIngredient) => (
                            <Badge key={formulaIngredient.ingredient.id} variant="outline" className="text-xs">
                                {formulaIngredient.ingredient.name} ({formulaIngredient.percentage}%)
                            </Badge>
                        ))}
                        {formula.ingredients.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                                +{formula.ingredients.length - 3} more
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 pt-2 mt-auto">
                    <Link href={`/formulae/${formula.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                        </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit?.(formula.id)}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                    </Button>
                    <Button variant="outline" size="sm" className="px-2" onClick={() => onDelete?.(formula.id)}>
                        <Trash2 className="w-3 h-3" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
