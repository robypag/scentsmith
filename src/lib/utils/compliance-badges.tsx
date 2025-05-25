import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Globe } from "lucide-react";

export const getComplianceStatus = (isCompliant: boolean) => {
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

export const getSeverityBadge = (severity: string) => {
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

export const getRegionBadge = (region: string) => {
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