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
import { FragranceCard } from "@/components/ui/fragrance-card";
import { mockFormulae, mockFormulaIngredients, mockIngredients } from "@/lib/mock-data/expert-data";
import { Plus, Search, Eye, Edit, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

export default function FormulaePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredFormulae = mockFormulae.filter((formula) => {
        const matchesSearch =
            formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formula.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || formula.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (formulaId: string) => {
        // TODO: Implement edit functionality
        console.log("Edit formula:", formulaId);
    };

    const handleDelete = (formulaId: string) => {
        // TODO: Implement delete functionality
        console.log("Delete formula:", formulaId);
    };

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
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">Compliant</Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800 dark:text-red-200">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Non-Compliant
            </Badge>
        );
    };

    const getFormulaIngredients = (formulaId: string) => {
        return mockFormulaIngredients
            .filter((fi) => fi.formulaId === formulaId)
            .map((fi) => {
                const ingredient = mockIngredients.find((ing) => ing.id === fi.ingredientId);
                return { ...fi, ingredient };
            });
    };

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gold">Formula Management</h1>
                    <p className="text-muted-foreground">Create, manage, and track your perfume formulae</p>
                </div>
                <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
                    <Plus className="w-4 h-4 mr-2" />
                    New Formula
                </Button>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Formulae</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="testing">In Testing</TabsTrigger>
                    <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    {/* Search and Filter Controls */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                    <div className="lg:col-span-3">
                                        <Label htmlFor="search" className="text-sm font-medium">
                                            Search Formulae
                                        </Label>
                                        <div className="relative mt-1.5">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="search"
                                                placeholder="Search by name or description..."
                                                className="pl-10 bg-white dark:bg-gray-800 border-input"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-1">
                                        <Label className="text-sm font-medium">Status Filter</Label>
                                        <div className="mt-1.5">
                                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                                <SelectTrigger className="bg-white dark:bg-gray-800 border-input">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white dark:bg-gray-800 border-input">
                                                    <SelectItem value="all">All Statuses</SelectItem>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="testing">Testing</SelectItem>
                                                    <SelectItem value="approved">Approved</SelectItem>
                                                    <SelectItem value="archived">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Formula Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredFormulae.map((formula) => {
                            const ingredients = getFormulaIngredients(formula.id).map((fi) => ({
                                id: fi.id,
                                name: fi.ingredient?.name || 'Unknown',
                                percentage: fi.percentage,
                            }));

                            return (
                                <FragranceCard
                                    key={formula.id}
                                    formula={formula}
                                    ingredients={ingredients}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            );
                        })}
                    </div>

                    {filteredFormulae.length === 0 && (
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <p className="text-muted-foreground">No formulae found matching your criteria.</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="active" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Formulae</CardTitle>
                            <CardDescription>Formulae currently in production or approved for use</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockFormulae
                                    .filter((f) => f.status === "approved")
                                    .map((formula) => (
                                        <div
                                            key={formula.id}
                                            className="flex items-center justify-between p-4 border rounded-lg"
                                        >
                                            <div>
                                                <h4 className="font-medium">{formula.name}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Version {formula.version}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(formula.status)}
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="testing" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Formulae in Testing</CardTitle>
                            <CardDescription>
                                Formulae currently undergoing stability and compliance testing
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockFormulae
                                    .filter((f) => f.status === "testing")
                                    .map((formula) => (
                                        <div
                                            key={formula.id}
                                            className="flex items-center justify-between p-4 border rounded-lg"
                                        >
                                            <div>
                                                <h4 className="font-medium">{formula.name}</h4>
                                                <p className="text-sm text-muted-foreground">{formula.notes}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getComplianceBadge(formula.isCompliant)}
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    Test Results
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="expiring" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Expiring Formulae</CardTitle>
                            <CardDescription>Formulae expiring within the next 90 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockFormulae
                                    .filter((f) => {
                                        const expDate = f.expirationDate ? new Date(f.expirationDate) : null;
                                        return expDate && expDate < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
                                    })
                                    .map((formula) => {
                                        const expDate = new Date(formula.expirationDate!);
                                        const daysLeft = Math.ceil(
                                            (expDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                                        );

                                        return (
                                            <div
                                                key={formula.id}
                                                className="flex items-center justify-between p-4 border rounded-lg bg-amber-50 dark:bg-amber-900/30"
                                            >
                                                <div>
                                                    <h4 className="font-medium">{formula.name}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Expires in {daysLeft} days ({expDate.toLocaleDateString()})
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-800 dark:text-amber-200">
                                                        <AlertTriangle className="w-3 h-3 mr-1" />
                                                        Expiring Soon
                                                    </Badge>
                                                    <Button variant="outline" size="sm">
                                                        Renew
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
