import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { FileText, Calendar, Eye } from "lucide-react";
import { DocumentDTO } from "@/types/document";
import { getDocumentTypeBadge } from "@/components/documents/document-badges";
import Link from "next/link";

interface DocumentAnalyticsTabProps {
    documents: DocumentDTO[];
}

export function DocumentAnalyticsTab({ documents }: DocumentAnalyticsTabProps) {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Documents"
                    value={documents.length}
                    description="+2 from last month"
                    icon={FileText}
                />
                <StatsCard
                    title="Legal Documents"
                    value={documents.filter((d) => d.type === "legal").length}
                    description="Regulatory compliance"
                    icon={FileText}
                    iconColor="text-slate-600"
                />
                <StatsCard
                    title="Safety Data Sheets"
                    value={documents.filter((d) => d.type === "sds").length}
                    description="Material safety info"
                    icon={FileText}
                    iconColor="text-amber-600"
                />
                <StatsCard title="Recent Uploads" value={5} description="This week" icon={Calendar} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Document Activity</CardTitle>
                    <CardDescription>Recent document views and updates</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {documents.slice(0, 5).map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center justify-between p-2 hover:bg-muted/35 rounded-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium text-sm">{doc.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Updated {new Date(doc.updatedAt).toLocaleDateString("it-IT")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getDocumentTypeBadge(doc.type)}
                                    <Link href={`/documents/${doc.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="w-3 h-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
