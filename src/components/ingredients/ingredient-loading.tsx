import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function IngredientLoading() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-9 w-16" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>

            {/* Basic Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-6 w-40" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </CardContent>
            </Card>

            {/* Commercial Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-6 w-48" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-6 w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Safety Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-6 w-40" />
                    </CardTitle>
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-900/30 dark:border-amber-800">
                        <div className="flex items-start space-x-3">
                            <Skeleton className="h-5 w-5" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Metadata */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-6 w-40" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-48" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}