"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockIngredients, mockAnalytics } from "@/lib/mock-data/expert-data";
import { Plus, Search, AlertTriangle, DollarSign, Beaker, Shield, TrendingUp, Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function IngredientsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [volatilityFilter, setVolatilityFilter] = useState("all");

    const filteredIngredients = mockIngredients.filter((ingredient) => {
        const matchesSearch =
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ingredient.odorProfile.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesVolatility = volatilityFilter === "all" || ingredient.volatility === volatilityFilter;
        return matchesSearch && matchesVolatility;
    });

    const getVolatilityBadge = (volatility: string) => {
        switch (volatility) {
            case "top":
                return <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-800 dark:text-sky-200">Top Note</Badge>;
            case "middle":
                return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">Middle Note</Badge>;
            case "base":
                return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-200">Base Note</Badge>;
            default:
                return <Badge variant="secondary">{volatility}</Badge>;
        }
    };

    const getSafetyLevel = (safetyNotes: string) => {
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

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gold">Ingredient Management</h1>
                    <p className="text-muted-foreground">Manage your fragrance ingredient inventory and safety data</p>
                </div>
                <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
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
                                <p className="text-2xl font-bold">{mockIngredients.length}</p>
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
                                <p className="text-2xl font-bold">
                                    ${mockAnalytics.costAnalysis.totalFormulaCost.toLocaleString()}
                                </p>
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
                                <p className="text-2xl font-bold">3</p>
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
                                <p className="text-2xl font-bold">98%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="inventory" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
                    <TabsTrigger value="safety">Safety Data</TabsTrigger>
                    <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="inventory" className="space-y-4">
                    {/* Search and Filter Controls */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                    <div className="lg:col-span-3">
                                        <Label htmlFor="search" className="text-sm font-medium">
                                            Search Ingredients
                                        </Label>
                                        <div className="relative mt-1.5">
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
                                    <div className="lg:col-span-1">
                                        <Label className="text-sm font-medium">Volatility Filter</Label>
                                        <div className="mt-1.5">
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
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ingredient Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredIngredients.map((ingredient) => (
                            <Card key={ingredient.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg">{ingredient.name}</CardTitle>
                                            <CardDescription className="text-sm">
                                                CAS: {ingredient.casNumber}
                                            </CardDescription>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {getVolatilityBadge(ingredient.volatility)}
                                            {getSafetyLevel(ingredient.safetyNotes)}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {ingredient.odorProfile}
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <span className="font-medium">IFRA Category:</span>
                                            <br />
                                            {ingredient.ifraCategory}
                                        </div>
                                        <div>
                                            <span className="font-medium">Max Conc:</span>
                                            <br />
                                            {ingredient.maxConcentration}%
                                        </div>
                                        <div>
                                            <span className="font-medium">Supplier:</span>
                                            <br />
                                            {ingredient.supplier}
                                        </div>
                                        <div>
                                            <span className="font-medium">Cost:</span>
                                            <br />${ingredient.cost}/kg
                                        </div>
                                    </div>

                                    <div className="p-2 bg-amber-50 rounded-md dark:bg-amber-900/30">
                                        <div className="text-xs font-medium text-amber-800 dark:text-amber-200 mb-1">Safety Notes:</div>
                                        <div className="text-xs text-amber-700 dark:text-amber-300">{ingredient.safetyNotes}</div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Eye className="w-3 h-3 mr-1" />
                                            View
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Edit className="w-3 h-3 mr-1" />
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="sm" className="px-2">
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="usage" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Most Used Ingredients</CardTitle>
                            <CardDescription>Ingredients ranked by usage frequency across all formulae</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockAnalytics.mostUsedIngredients.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between p-4 border rounded-lg"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-center w-8 h-8 bg-gold/10 rounded-full">
                                                <span className="text-sm font-bold text-gold">#{index + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium">{item.name}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Used in {item.usage} formulae
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                {item.trend}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
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
                                        High Risk Ingredients
                                    </h4>
                                    <div className="space-y-2">
                                        {mockIngredients
                                            .filter(
                                                (ing) =>
                                                    ing.safetyNotes.toLowerCase().includes("phototoxic") ||
                                                    ing.safetyNotes.toLowerCase().includes("allergen"),
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
                                        Medium Risk Ingredients
                                    </h4>
                                    <div className="space-y-2">
                                        {mockIngredients
                                            .filter(
                                                (ing) =>
                                                    ing.safetyNotes.toLowerCase().includes("sparingly") ||
                                                    ing.safetyNotes.toLowerCase().includes("sensitizer"),
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
                                            {mockIngredients
                                                .sort((a, b) => b.cost - a.cost)
                                                .slice(0, 5)
                                                .map((ingredient) => (
                                                    <div key={ingredient.id} className="flex justify-between text-sm">
                                                        <span>{ingredient.name}</span>
                                                        <span className="font-medium">${ingredient.cost}/kg</span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="p-4 border rounded-lg">
                                        <h4 className="font-medium mb-2">Cost Optimization</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Total Inventory Value</span>
                                                <span className="font-medium">
                                                    ${mockAnalytics.costAnalysis.totalFormulaCost.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Average Cost per Formula</span>
                                                <span className="font-medium">
                                                    ${mockAnalytics.costAnalysis.averageCostPerFormula.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Optimization Opportunities</span>
                                                <span className="font-medium text-green-600">
                                                    {mockAnalytics.costAnalysis.costOptimizationOpportunities}
                                                </span>
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
