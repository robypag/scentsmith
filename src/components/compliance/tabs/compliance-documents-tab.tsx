import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Document } from "@/types/document";

interface ComplianceDocumentsTabProps {
  documents: Document[];
}

export function ComplianceDocumentsTab({ documents }: ComplianceDocumentsTabProps) {
  const legalAndSdsDocuments = documents.filter((doc) => doc.type === "legal" || doc.type === "sds");

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Legal Documents</CardTitle>
          <CardDescription>Regulatory documents and safety data sheets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {legalAndSdsDocuments.map((document) => (
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
    </div>
  );
}