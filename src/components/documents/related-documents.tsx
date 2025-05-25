import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function RelatedDocuments() {
    // In a real app, this would use vector similarity search
    const relatedDocs = [
        {
            id: "doc-2",
            title: "EU Cosmetics Regulation Update Q1 2024",
            similarity: 85,
        },
        {
            id: "doc-3",
            title: "Bergamot Oil Safety Data Sheet",
            similarity: 72,
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Related Documents</CardTitle>
                <CardDescription>Documents with similar content or regulations</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {relatedDocs.map((doc) => (
                        <div key={doc.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h5 className="font-medium text-sm">{doc.title}</h5>
                                    <p className="text-xs text-muted-foreground">{doc.similarity}% similarity</p>
                                </div>
                                <Link href={`/documents/${doc.id}`}>
                                    <Button variant="outline" size="sm">
                                        View
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
