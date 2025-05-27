import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <AlertTriangle className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-2xl">Formula Not Found</CardTitle>
                    <CardDescription>
                        The formula you&apos;re looking for doesn&apos;t exist or may have been removed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Link href="/formulae">
                        <Button className="w-full">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Formulae
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}