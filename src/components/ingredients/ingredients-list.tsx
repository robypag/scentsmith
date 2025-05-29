"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, AlertTriangle, DollarSign, Beaker, Shield } from "lucide-react";
import { useState } from "react";
import { Ingredient } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { IngredientCard } from "./ingredient-card";

interface IngredientsListProps {
    ingredients: Ingredient[];
    stats: {
        totalIngredients: number;
        highRiskCount: number;
        mediumRiskCount: number;
        lowRiskCount: number;
        averageCost: number;
        totalValue: number;
    };
}

export function IngredientsList({ ingredients, stats }: IngredientsListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [volatilityFilter, setVolatilityFilter] = useState("all");
    const router = useRouter();

    const filteredIngredients = ingredients.filter((ingredient) => {
        const matchesSearch =
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ingredient.odorProfile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ingredient.casNumber?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesVolatility = volatilityFilter === "all" || ingredient.volatility === volatilityFilter;
        return matchesSearch && matchesVolatility;
    });



    const complianceRate =
        stats.totalIngredients > 0 ? Math.round((stats.lowRiskCount / stats.totalIngredients) * 100) : 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gold">Ingredient Management</h1>
                    <p className="text-muted-foreground">Manage your fragrance ingredient inventory and safety data</p>
                </div>
                <Button
                    className="bg-gold text-gold-foreground hover:bg-gold/90"
                    onClick={() => router.push("/ingredients/create")}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Ingredient
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gold/10 rounded-lg dark:bg-gold/20">
                                <Beaker className="h-5 w-5 text-gold" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-muted-foreground">Total Ingredients</p>
                                <p className="text-2xl font-bold">{stats.totalIngredients}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gold/10 rounded-lg dark:bg-gold/20">
                                <DollarSign className="h-5 w-5 text-gold" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                                <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-800">
                                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-muted-foreground">High Risk Items</p>
                                <p className="text-2xl font-bold">{stats.highRiskCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg dark:bg-green-800">
                                <Shield className="h-5 w-5 text-green-600 dark:text-green-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-muted-foreground">Compliance Rate</p>
                                <p className="text-2xl font-bold">{complianceRate}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="inventory" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="safety">Safety Data</TabsTrigger>
                    <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="inventory" className="space-y-4">
                    {/* Search and Filter Controls */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                    <div className="lg:col-span-3 space-y-2">
                                        <Label htmlFor="search" className="text-sm font-medium">
                                            Search Ingredients
                                        </Label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="search"
                                                placeholder="Search by name or odor profile..."
                                                className="pl-10 bg-white dark:bg-gray-800 border-input"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-1 space-y-2">
                                        <Label className="text-sm font-medium">Volatility Filter</Label>
                                        <Select value={volatilityFilter} onValueChange={setVolatilityFilter}>
                                            <SelectTrigger className="bg-white dark:bg-gray-800 border-input">
                                                <SelectValue placeholder="Select volatility" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white dark:bg-gray-800 border-input">
                                                <SelectItem value="all">All Types</SelectItem>
                                                <SelectItem value="top">Top Notes</SelectItem>
                                                <SelectItem value="middle">Middle Notes</SelectItem>
                                                <SelectItem value="base">Base Notes</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ingredient Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredIngredients.map((ingredient) => (
                            <IngredientCard key={ingredient.id} ingredient={ingredient} />
                        ))}
                    </div>

                    {filteredIngredients.length === 0 && (
                        <div className="text-center py-12">
                            <Beaker className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No ingredients found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {searchTerm || volatilityFilter !== "all"
                                    ? "Try adjusting your search or filter criteria."
                                    : "Get started by adding your first ingredient."}
                            </p>
                            {!searchTerm && volatilityFilter === "all" && (
                                <div className="mt-6">
                                    <Button
                                        onClick={() => router.push("/ingredients/create")}
                                        className="bg-gold text-gold-foreground hover:bg-gold/90"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Ingredient
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="safety" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Safety Classification</CardTitle>
                            <CardDescription>Ingredients grouped by risk level and safety requirements</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-medium mb-3 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-red-500" />
                                        High Risk Ingredients ({stats.highRiskCount})
                                    </h4>
                                    <div className="space-y-2">
                                        {ingredients
                                            .filter(
                                                (ing) =>
                                                    ing.safetyNotes?.toLowerCase().includes("phototoxic") ||
                                                    ing.safetyNotes?.toLowerCase().includes("allergen"),
                                            )
                                            .map((ingredient) => (
                                                <div
                                                    key={ingredient.id}
                                                    className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/30 dark:border-red-800"
                                                >
                                                    <div>
                                                        <span className="font-medium">{ingredient.name}</span>
                                                        <p className="text-sm text-red-700">{ingredient.safetyNotes}</p>
                                                    </div>
                                                    <Badge variant="destructive">High Risk</Badge>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-3 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                        Medium Risk Ingredients ({stats.mediumRiskCount})
                                    </h4>
                                    <div className="space-y-2">
                                        {ingredients
                                            .filter(
                                                (ing) =>
                                                    ing.safetyNotes?.toLowerCase().includes("sparingly") ||
                                                    ing.safetyNotes?.toLowerCase().includes("sensitizer"),
                                            )
                                            .map((ingredient) => (
                                                <div
                                                    key={ingredient.id}
                                                    className="flex items-center justify-between p-3 border border-amber-200 rounded-lg bg-amber-50 dark:bg-amber-900/30 dark:border-amber-800"
                                                >
                                                    <div>
                                                        <span className="font-medium">{ingredient.name}</span>
                                                        <p className="text-sm text-amber-700 dark:text-amber-300">
                                                            {ingredient.safetyNotes}
                                                        </p>
                                                    </div>
                                                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-800 dark:text-amber-200">
                                                        Medium Risk
                                                    </Badge>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="costs" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cost Analysis</CardTitle>
                            <CardDescription>Ingredient costs and optimization opportunities</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="p-4 border rounded-lg">
                                        <h4 className="font-medium mb-2">Most Expensive Ingredients</h4>
                                        <div className="space-y-2">
                                            {ingredients
                                                .sort((a, b) => parseFloat(b.cost || "0") - parseFloat(a.cost || "0"))
                                                .slice(0, 5)
                                                .map((ingredient) => (
                                                    <div key={ingredient.id} className="flex justify-between text-sm">
                                                        <span>{ingredient.name}</span>
                                                        <span className="font-medium">
                                                            ${parseFloat(ingredient.cost || "0").toFixed(2)}/kg
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                        <h4 className="font-medium mb-2">Cost Summary</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Total Inventory Value</span>
                                                <span className="font-medium">
                                                    ${stats.totalValue.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Average Cost per Ingredient</span>
                                                <span className="font-medium">${stats.averageCost.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Total Ingredients</span>
                                                <span className="font-medium">{stats.totalIngredients}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
