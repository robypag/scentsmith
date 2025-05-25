import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, Clock, FileText } from "lucide-react";

interface ComplianceOverviewProps {
    compliantCount: number;
    nonCompliantCount: number;
    pendingReviewCount: number;
    activeRegulationsCount: number;
}

export function ComplianceOverview({
    compliantCount,
    nonCompliantCount,
    pendingReviewCount,
    activeRegulationsCount,
}: ComplianceOverviewProps) {
    return (
        <div className="grid gap-4 md:grid-cols-4">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg dark:bg-green-800">
                            <Shield className="h-5 w-5 text-green-600 dark:text-green-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-muted-foreground">Compliant Formulae</p>
                            <p className="text-2xl font-bold text-green-600">{compliantCount}</p>
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
                            <p className="text-2xl font-bold text-red-600">{nonCompliantCount}</p>
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
                            <p className="text-2xl font-bold text-yellow-600">{pendingReviewCount}</p>
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
                            <p className="text-2xl font-bold">{activeRegulationsCount}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
