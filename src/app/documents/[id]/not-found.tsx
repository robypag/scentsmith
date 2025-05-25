import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DocumentNotFound() {
    return (
        <div className="p-4 h-full flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-muted w-fit">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl">Document Not Found</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-muted-foreground">
                        The document you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <Link href="/documents">
                        <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Documents
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
