import { Suspense } from "react";
import { notFound } from "next/navigation";
import { EditFormulaForm } from "@/components/formulae/forms";
import { loadFormulaById, loadAllIngredients } from "@/lib/actions/formulae";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface EditFormulaPageProps {
    params: Promise<{
        id: string;
    }>;
}

async function EditFormulaContent({ params }: EditFormulaPageProps) {
    try {
        const resolvedParams = await params;
        const [formula, ingredients] = await Promise.all([loadFormulaById(resolvedParams.id), loadAllIngredients()]);

        return (
            <div className="container mx-auto py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Edit Formula</h1>
                        <p className="text-muted-foreground mt-2">
                            Edit {formula.name} - Version {formula.version}
                        </p>
                    </div>

                    <EditFormulaForm formula={formula} ingredients={ingredients} />
                </div>
            </div>
        );
    } catch (error) {
        console.error(error);
        notFound();
    }
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

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-24" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-32" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function EditFormulaPage({ params }: EditFormulaPageProps) {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <EditFormulaContent params={params} />
        </Suspense>
    );
}
