import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import FormulaCardSkeleton from "./formula-card-skeleton";

export function FormulaePageSkeleton() {
    return (
        <div className="p-4 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Tabs Navigation */}
            <div className="space-y-4">
                <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-28" />
                </div>

                {/* Search and Filter Controls */}
                <Card>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                <div className="lg:col-span-3 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="lg:col-span-1 space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Formula Cards Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <FormulaCardSkeleton />
                    <FormulaCardSkeleton />
                    <FormulaCardSkeleton />
                    <FormulaCardSkeleton />
                    <FormulaCardSkeleton />
                    <FormulaCardSkeleton />
                </div>
            </div>
        </div>
    );
}