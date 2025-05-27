"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Edit, Trash2, ArrowLeft, Beaker, DollarSign, Shield, Factory } from "lucide-react";
import { Ingredient } from "@/lib/db/schema";
import { deleteIngredient } from "@/lib/actions/ingredients";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IngredientDetailsProps {
    ingredient: Ingredient;
}

export function IngredientDetails({ ingredient }: IngredientDetailsProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const getVolatilityBadge = (volatility: string | null) => {
        switch (volatility) {
            case "top":
                return <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-800 dark:text-sky-200">Top Note</Badge>;
            case "middle":
                return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">Middle Note</Badge>;
            case "base":
                return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-200">Base Note</Badge>;
            default:
                return <Badge variant="secondary">{volatility || "Unknown"}</Badge>;
        }
    };

    const getSafetyLevel = (safetyNotes: string | null) => {
        if (!safetyNotes) return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">Low Risk</Badge>;
        
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
            return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-800 dark:text-amber-200">Medium Risk</Badge>;
        } else {
            return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">Low Risk</Badge>;
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${ingredient.name}"? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await deleteIngredient(ingredient.id);
            if (result.success) {
                toast.success("Ingredient deleted successfully");
                router.push("/ingredients");
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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gold">{ingredient.name}</h1>
                        <p className="text-muted-foreground">
                            {ingredient.casNumber ? `CAS: ${ingredient.casNumber}` : "Ingredient Details"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => router.push(`/ingredients/${ingredient.id}/edit`)}
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </div>

            {/* Basic Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Beaker className="h-5 w-5" />
                        Basic Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Ingredient Name</h4>
                            <p className="text-lg font-semibold">{ingredient.name}</p>
                        </div>
                        
                        {ingredient.casNumber && (
                            <div>
                                <h4 className="font-medium text-sm text-muted-foreground">CAS Number</h4>
                                <p className="text-lg">{ingredient.casNumber}</p>
                            </div>
                        )}
                        
                        <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Volatility</h4>
                            <div className="mt-1">
                                {getVolatilityBadge(ingredient.volatility)}
                            </div>
                        </div>
                        
                        {ingredient.ifraCategory && (
                            <div>
                                <h4 className="font-medium text-sm text-muted-foreground">IFRA Category</h4>
                                <p className="text-lg">{ingredient.ifraCategory}</p>
                            </div>
                        )}
                        
                        {ingredient.maxConcentration && (
                            <div>
                                <h4 className="font-medium text-sm text-muted-foreground">Max Concentration</h4>
                                <p className="text-lg">{ingredient.maxConcentration}%</p>
                            </div>
                        )}
                        
                        <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Safety Level</h4>
                            <div className="mt-1">
                                {getSafetyLevel(ingredient.safetyNotes)}
                            </div>
                        </div>
                    </div>

                    {ingredient.odorProfile && (
                        <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">Odor Profile</h4>
                            <p className="text-base leading-relaxed">{ingredient.odorProfile}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Commercial Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Commercial Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ingredient.supplier && (
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-800">
                                    <Factory className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm text-muted-foreground">Supplier</h4>
                                    <p className="text-lg">{ingredient.supplier}</p>
                                </div>
                            </div>
                        )}
                        
                        {ingredient.cost && (
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gold/10 rounded-lg dark:bg-gold/20">
                                    <DollarSign className="h-5 w-5 text-gold" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm text-muted-foreground">Cost per kg</h4>
                                    <p className="text-lg font-semibold">${parseFloat(ingredient.cost).toFixed(2)}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Safety Information */}
            {ingredient.safetyNotes && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Safety Information
                        </CardTitle>
                        <CardDescription>
                            Important safety notes and handling instructions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-900/30 dark:border-amber-800">
                            <div className="flex items-start space-x-3">
                                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Safety Notes</h4>
                                    <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                                        {ingredient.safetyNotes}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Metadata */}
            <Card>
                <CardHeader>
                    <CardTitle>Record Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                            <span className="font-medium">Created:</span>{" "}
                            {ingredient.createdAt ? new Date(ingredient.createdAt).toLocaleDateString() : "Unknown"}
                        </div>
                        <div>
                            <span className="font-medium">Last Updated:</span>{" "}
                            {ingredient.updatedAt ? new Date(ingredient.updatedAt).toLocaleDateString() : "Unknown"}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}