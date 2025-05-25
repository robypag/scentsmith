"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    mockComplianceRules,
    mockFormulae,
    mockIngredients,
    mockAnalytics,
    mockDocuments,
} from "@/lib/mock-data/expert-data";
import { FileText } from "lucide-react";
import { useState } from "react";
import { ComplianceOverview } from "@/components/compliance/compliance-overview";
import { 
    ComplianceAlertsTab, 
    ComplianceRegulationsTab, 
    ComplianceReportsTab, 
    ComplianceDocumentsTab 
} from "@/components/compliance/tabs";

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

    const compliantCount = mockFormulae.filter((f) => f.isCompliant).length;
    const nonCompliantCount = mockFormulae.filter((f) => !f.isCompliant).length;
    const pendingReviewCount = 5;
    const activeRegulationsCount = mockComplianceRules.length;

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

            <ComplianceOverview
                compliantCount={compliantCount}
                nonCompliantCount={nonCompliantCount}
                pendingReviewCount={pendingReviewCount}
                activeRegulationsCount={activeRegulationsCount}
            />

            <Tabs defaultValue="alerts" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="alerts">Compliance Alerts</TabsTrigger>
                    <TabsTrigger value="regulations">Regulations</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                    <TabsTrigger value="documents">Legal Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="alerts" className="space-y-4">
                    <ComplianceAlertsTab
                        complianceAlerts={mockAnalytics.complianceAlerts}
                        formulae={mockFormulae}
                    />
                </TabsContent>

                <TabsContent value="regulations" className="space-y-4">
                    <ComplianceRegulationsTab
                        filteredRules={filteredRules}
                        ingredients={mockIngredients}
                        searchTerm={searchTerm}
                        regionFilter={regionFilter}
                        onSearchChange={setSearchTerm}
                        onRegionChange={setRegionFilter}
                    />
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                    <ComplianceReportsTab />
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                    <ComplianceDocumentsTab documents={mockDocuments} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
