"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormulaCard } from "@/components/formulae/formula-card";
import { Plus, Search, Eye, Edit, AlertTriangle, CheckCircle, Clock, TestTube } from "lucide-react";
import { useState } from "react";
import { FormulaDTO } from "@/types/formula";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormulaeListProps {
    formulae: FormulaDTO[];
}

export function FormulaeList({ formulae }: FormulaeListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const router = useRouter();

    const filteredFormulae = formulae.filter((formula) => {
        const matchesSearch =
            formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formula.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || formula.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

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

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gold">Formula Management</h1>
                    <p className="text-muted-foreground">Create, manage, and track your perfume formulae</p>
                </div>
                <Link href={`/formulae/create`}>
                    <Button className="bg-gold text-gold-foreground hover:bg-gold/90 w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        New Formula
                    </Button>
                </Link>
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
                            return (
                                <FormulaCard
                                    key={formula.id}
                                    formula={formula}
                                    onEdit={() => router.push(`/formulae/${formula.id}/edit`)}
                                    onDelete={handleDelete}
                                />
                            );
                        })}
                    </div>

                    {filteredFormulae.length === 0 && (
                        <div className="text-center py-12">
                            <TestTube className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No formula found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {searchTerm || statusFilter !== "all"
                                    ? "Try adjusting your search or filter criteria."
                                    : "Get started by adding your first formula."}
                            </p>
                            {!searchTerm && statusFilter === "all" && (
                                <div className="mt-6">
                                    <Button
                                        onClick={() => router.push("/formulae/create")}
                                        className="bg-gold text-gold-foreground hover:bg-gold/90"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Formula
                                    </Button>
                                </div>
                            )}
                        </div>
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
                                {formulae
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
                                                {getStatusBadge(formula.status ?? "unknown")}
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            {formulae.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {"Get started by adding your first formula."}
                                    </p>
                                </div>
                            )}
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
                                {formulae
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
                                                {getComplianceBadge(formula.isCompliant ?? false)}
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    Test Results
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            {formulae.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {"Get started by adding your first formula."}
                                    </p>
                                </div>
                            )}
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
                                {formulae
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
                            {formulae.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {"Get started by adding your first formula."}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
