import { Card, CardContent } from "@/components/ui/card";
import { DocumentsSearchClient } from "./documents-search-client";

export function DocumentsSearch() {
    return (
        <Card>
            <CardContent className="p-6">
                <DocumentsSearchClient />
            </CardContent>
        </Card>
    );
}
