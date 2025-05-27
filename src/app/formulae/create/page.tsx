import { Suspense } from "react";
import { CreateFormulaForm } from "@/components/formulae/forms";
import { loadAllIngredients } from "@/lib/actions/formulae";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

async function CreateFormulaContent() {
    const ingredients = await loadAllIngredients();

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Create New Formula</h1>
                    <p className="text-muted-foreground mt-2">
                        Create a new fragrance formula with ingredients and test results.
                    </p>
                </div>

                <CreateFormulaForm ingredients={ingredients} />
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-96" />
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Skeleton className="h-10" />
                                <Skeleton className="h-10" />
                            </div>
                            <Skeleton className="h-20" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Skeleton className="h-10" />
                                <Skeleton className="h-10" />
                                <Skeleton className="h-10" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-40" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function CreateFormulaPage() {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <CreateFormulaContent />
        </Suspense>
    );
}
