"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    mockComplianceRules,
    mockFormulae,
    mockIngredients,
    mockAnalytics,
    mockDocuments,
} from "@/lib/mock-data/expert-data";
import { AlertTriangle, Shield, FileText, Search, CheckCircle, XCircle, Clock, Globe } from "lucide-react";
import { useState } from "react";

export default function CompliancePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [regionFilter, setRegionFilter] = useState("all");

    const filteredRules = mockComplianceRules.filter((rule) => {
        const ingredient = mockIngredients.find((ing) => ing.id === rule.ingredientId);
        const matchesSearch =
            ingredient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rule.regulation.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = regionFilter === "all" || rule.region === regionFilter;
        return matchesSearch && matchesRegion;
    });

    const getComplianceStatus = (isCompliant: boolean) => {
        return isCompliant ? (
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Compliant
            </Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800 dark:text-red-200">
                <XCircle className="w-3 h-3 mr-1" />
                Non-Compliant
            </Badge>
        );
    };

    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case "high":
                return <Badge variant="destructive">High</Badge>;
            case "medium":
                return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>;
            case "low":
                return <Badge className="bg-blue-500 hover:bg-blue-600">Low</Badge>;
            default:
                return <Badge variant="secondary">{severity}</Badge>;
        }
    };

    const getRegionBadge = (region: string) => {
        switch (region) {
            case "EU":
                return (
                    <Badge className="bg-blue-500 hover:bg-blue-600">
                        <Globe className="w-3 h-3 mr-1" />
                        EU
                    </Badge>
                );
            case "US":
                return (
                    <Badge className="bg-green-500 hover:bg-green-600">
                        <Globe className="w-3 h-3 mr-1" />
                        US
                    </Badge>
                );
            case "Global":
                return (
                    <Badge className="bg-purple-500 hover:bg-purple-600">
                        <Globe className="w-3 h-3 mr-1" />
                        Global
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline">
                        <Globe className="w-3 h-3 mr-1" />
                        {region}
                    </Badge>
                );
        }
    };

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gold">Compliance Monitoring</h1>
                    <p className="text-muted-foreground">
                        Monitor regulatory compliance across all markets and regulations
                    </p>
                </div>
                <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
                    <FileText className="w-4 h-4 mr-2" />
                    Upload Regulation
                </Button>
            </div>

            {/* Compliance Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg dark:bg-green-800">
                                <Shield className="h-5 w-5 text-green-600 dark:text-green-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-muted-foreground">Compliant Formulae</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {mockFormulae.filter((f) => f.isCompliant).length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-100 rounded-lg dark:bg-red-800">
                                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-muted-foreground">Non-Compliant</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {mockFormulae.filter((f) => !f.isCompliant).length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-800">
                                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                                <p className="text-2xl font-bold text-yellow-600">5</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gold/10 rounded-lg dark:bg-gold/20">
                                <FileText className="h-5 w-5 text-gold" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-muted-foreground">Active Regulations</p>
                                <p className="text-2xl font-bold">{mockComplianceRules.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="alerts" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="alerts">Compliance Alerts</TabsTrigger>
                    <TabsTrigger value="regulations">Regulations</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                    <TabsTrigger value="documents">Legal Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="alerts" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Compliance Alerts</CardTitle>
                            <CardDescription>
                                Formulae requiring immediate attention for compliance issues
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockAnalytics.complianceAlerts.map((alert, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 border rounded-lg ${
                                            alert.severity === "high"
                                                ? "bg-red-50 border-red-200"
                                                : alert.severity === "medium"
                                                  ? "bg-yellow-50 border-yellow-200"
                                                  : "bg-blue-50 border-blue-200"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle
                                                        className={`w-4 h-4 ${
                                                            alert.severity === "high"
                                                                ? "text-red-500"
                                                                : alert.severity === "medium"
                                                                  ? "text-yellow-500"
                                                                  : "text-blue-500"
                                                        }`}
                                                    />
                                                    <h4 className="font-medium">{alert.formula}</h4>
                                                    {getSeverityBadge(alert.severity)}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{alert.issue}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    Review
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    Fix
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Formula Compliance Status</CardTitle>
                            <CardDescription>Overview of all formulae and their compliance status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockFormulae.map((formula) => (
                                    <div
                                        key={formula.id}
                                        className="flex items-center justify-between p-4 border rounded-lg"
                                    >
                                        <div className="space-y-1">
                                            <h4 className="font-medium">{formula.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Last checked:{" "}
                                                {formula.lastComplianceCheck
                                                    ? new Date(formula.lastComplianceCheck).toLocaleDateString()
                                                    : "Never"}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getComplianceStatus(formula.isCompliant)}
                                            <Button variant="outline" size="sm">
                                                <Shield className="w-3 h-3 mr-1" />
                                                Check Now
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="regulations" className="space-y-4">
                    {/* Search and Filter Controls */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="search-regulations">Search Regulations</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="search-regulations"
                                            placeholder="Search by ingredient or regulation..."
                                            className="pl-10 border-gold/30 focus-visible:ring-gold/30"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-48">
                                    <Label htmlFor="region-filter">Region Filter</Label>
                                    <select
                                        id="region-filter"
                                        className="w-full h-10 px-3 py-2 bg-background border border-gold/30 rounded-md text-sm"
                                        value={regionFilter}
                                        onChange={(e) => setRegionFilter(e.target.value)}
                                    >
                                        <option value="all">All Regions</option>
                                        <option value="EU">European Union</option>
                                        <option value="US">United States</option>
                                        <option value="Global">Global</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Active Regulations</CardTitle>
                            <CardDescription>Current regulatory restrictions and guidelines</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredRules.map((rule) => {
                                    const ingredient = mockIngredients.find((ing) => ing.id === rule.ingredientId);
                                    return (
                                        <div key={rule.id} className="p-4 border rounded-lg">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-medium">{ingredient?.name}</h4>
                                                        {getRegionBadge(rule.region)}
                                                        <Badge variant="outline">{rule.regulation}</Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{rule.restrictions}</p>
                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                        <span>Max Concentration: {rule.maxConcentration}%</span>
                                                        <span>
                                                            Effective:{" "}
                                                            {new Date(rule.effectiveDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    <FileText className="w-3 h-3 mr-1" />
                                                    View Document
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Compliance Reports</CardTitle>
                            <CardDescription>
                                Generate and view compliance reports for different markets
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="p-4 border rounded-lg">
                                    <h4 className="font-medium mb-2">EU Market Report</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Compliance status for European Union regulations
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Compliant Formulae</span>
                                            <span className="text-green-600 font-medium">85%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Non-Compliant</span>
                                            <span className="text-red-600 font-medium">15%</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full mt-3">
                                        Generate Full Report
                                    </Button>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h4 className="font-medium mb-2">IFRA Global Report</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        International Fragrance Association compliance
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Compliant Formulae</span>
                                            <span className="text-green-600 font-medium">92%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Non-Compliant</span>
                                            <span className="text-red-600 font-medium">8%</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full mt-3">
                                        Generate Full Report
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Legal Documents</CardTitle>
                            <CardDescription>Regulatory documents and safety data sheets</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockDocuments
                                    .filter((doc) => doc.type === "legal" || doc.type === "sds")
                                    .map((document) => (
                                        <div
                                            key={document.id}
                                            className="flex items-center justify-between p-4 border rounded-lg"
                                        >
                                            <div className="space-y-1">
                                                <h4 className="font-medium">{document.title}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {document.type.toUpperCase()} • {document.tags.join(", ")}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Uploaded: {new Date(document.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    <FileText className="w-3 h-3 mr-1" />
                                                    View
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
