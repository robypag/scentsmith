import { Badge } from "@/components/ui/badge";
import { FileText, Shield, Beaker, BookOpen, File } from "lucide-react";

export const getDocumentTypeBadge = (type: string) => {
    switch (type) {
        case "legal":
            return (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-200">
                    <Shield className="w-3 h-3 mr-1" />
                    Legal/Regulatory
                </Badge>
            );
        case "sds":
            return (
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-800 dark:text-orange-200">
                    <Shield className="w-3 h-3 mr-1" />
                    Safety Data Sheet
                </Badge>
            );
        case "formula":
            return (
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-200">
                    <Beaker className="w-3 h-3 mr-1" />
                    Formula Documentation
                </Badge>
            );
        case "research":
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-200">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Research Paper
                </Badge>
            );
        case "other":
            return (
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
                    <File className="w-3 h-3 mr-1" />
                    Other
                </Badge>
            );
        default:
            return (
                <Badge variant="outline">
                    <FileText className="w-3 h-3 mr-1" />
                    {type}
                </Badge>
            );
    }
};

export const getDocumentStatusBadge = (status: string) => {
    switch (status) {
        case "active":
            return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
        case "archived":
            return <Badge className="bg-gray-500 hover:bg-gray-600">Archived</Badge>;
        case "draft":
            return <Badge className="bg-yellow-500 hover:bg-yellow-600">Draft</Badge>;
        case "pending":
            return <Badge className="bg-blue-500 hover:bg-blue-600">Pending</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};