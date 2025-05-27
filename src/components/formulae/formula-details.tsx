"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Calendar,
    AlertTriangle,
    CheckCircle,
    Clock,
    Edit,
    ArrowLeft,
    Beaker,
    FileText,
    Users,
    TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { FormulaDTO } from "@/types/formula";

interface FormulaDetailsProps {
    formula: FormulaDTO;
}

export function FormulaDetails({ formula }: FormulaDetailsProps) {
    const ingredients = formula.ingredients;
    const getStatusBadge = (status: string | null) => {
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
                return <Badge variant="secondary">{status || "Unknown"}</Badge>;
        }
    };

    const getComplianceBadge = (isCompliant: boolean | null) => {
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

    const totalCost = ingredients.reduce((sum, ing) => {
        const cost = Number(ing.ingredient.cost) || 0;
        const percentage = Number(ing.percentage) || 0;
        return sum + cost * (percentage / 100);
    }, 0);

    return (
        <div className="p-4 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/formulae">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Formulae
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gold">{formula.name}</h1>
                        <p className="text-muted-foreground">Version {formula.version || "1.0"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {getStatusBadge(formula.status)}
                    {getComplianceBadge(formula.isCompliant)}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-medium mb-2">Description</h4>
                                <p className="text-muted-foreground">{formula.description}</p>
                            </div>

                            {formula.notes && (
                                <div>
                                    <h4 className="font-medium mb-2">Notes</h4>
                                    <p className="text-muted-foreground">{formula.notes}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Total Concentration</span>
                                    <p className="text-lg font-semibold text-gold">{formula.totalConcentration || "0"}%</p>
                                </div>
                                <div>
                                    <span className="font-medium">Batch Size</span>
                                    <p className="text-lg font-semibold">{formula.batchSize || "0"}g</p>
                                </div>
                                <div>
                                    <span className="font-medium">Ingredients</span>
                                    <p className="text-lg font-semibold">{ingredients.length}</p>
                                </div>
                                <div>
                                    <span className="font-medium">Est. Cost</span>
                                    <p className="text-lg font-semibold">${totalCost.toFixed(2)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ingredients */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Beaker className="w-5 h-5" />
                                Formula Composition
                            </CardTitle>
                            <CardDescription>
                                Detailed breakdown of all ingredients and their concentrations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {ingredients.map((ing) => (
                                    <div
                                        key={ing.id}
                                        className="flex items-center justify-between p-4 border rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <h4 className="font-medium">{ing.ingredient.name}</h4>
                                                <Badge variant="outline" className="text-xs">
                                                    {ing.ingredient.volatility}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {ing.ingredient.odorProfile}
                                            </p>
                                            {ing.notes && (
                                                <p className="text-xs text-muted-foreground mt-1 italic">
                                                    Note: {ing.notes}
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-semibold">{ing.percentage}%</div>
                                            <div className="text-sm text-muted-foreground">
                                                ${((Number(ing.ingredient.cost) || 0) * (Number(ing.percentage) / 100)).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Key Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Key Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="text-sm font-medium">Created</span>
                                <p className="text-sm text-muted-foreground">
                                    {formula.createdAt.toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <span className="text-sm font-medium">Last Updated</span>
                                <p className="text-sm text-muted-foreground">
                                    {formula.updatedAt.toLocaleDateString()}
                                </p>
                            </div>
                            {formula.lastComplianceCheck && (
                                <div>
                                    <span className="text-sm font-medium">Last Compliance Check</span>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(formula.lastComplianceCheck).toLocaleDateString()}
                                    </p>
                                </div>
                            )}

                            <Separator />

                            {expirationDate && (
                                <div
                                    className={`flex items-center gap-2 text-sm p-3 rounded-md ${
                                        isExpiringSoon
                                            ? "bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                            : "bg-muted text-muted-foreground"
                                    }`}
                                >
                                    <Calendar className="w-4 h-4" />
                                    <div>
                                        <span className="font-medium">Expires:</span>
                                        <br />
                                        {expirationDate.toLocaleDateString()}
                                        {isExpiringSoon && <span className="block text-xs mt-1">Expiring soon!</span>}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Formula
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Users className="w-4 h-4 mr-2" />
                                Create Batch
                            </Button>
                            <Button variant="outline" className="w-full">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Run Analysis
                            </Button>
                            <Button variant="outline" className="w-full">
                                <FileText className="w-4 h-4 mr-2" />
                                Export Formula
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Compliance Status */}
                    {formula.isCompliant === false && (
                        <Card className="border-red-200 dark:border-red-800">
                            <CardHeader>
                                <CardTitle className="text-red-800 dark:text-red-200">
                                    <AlertTriangle className="w-4 h-4 mr-2 inline" />
                                    Compliance Issues
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-red-700 dark:text-red-300">
                                    This formula has compliance issues that need to be addressed before production.
                                </p>
                                <Button variant="outline" size="sm" className="w-full mt-3">
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}