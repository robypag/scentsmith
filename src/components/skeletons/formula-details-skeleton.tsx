import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FormulaDetailsSkeleton() {
    return (
        <div className="p-4 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-9 w-32" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Skeleton className="h-5 w-5" />
                                <Skeleton className="h-6 w-20" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-full" />
                                    <Skeleton className="h-6 w-12" />
                                </div>
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-full" />
                                    <Skeleton className="h-6 w-12" />
                                </div>
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-full" />
                                    <Skeleton className="h-6 w-8" />
                                </div>
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-full" />
                                    <Skeleton className="h-6 w-12" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ingredients */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Skeleton className="h-5 w-5" />
                                <Skeleton className="h-6 w-32" />
                            </CardTitle>
                            <Skeleton className="h-4 w-48" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Array.from({ length: 6 }, (_, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-4 w-16" />
                                            </div>
                                            <Skeleton className="h-3 w-48" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                        <div className="text-right space-y-1">
                                            <Skeleton className="h-5 w-12" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Key Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-5 w-32" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-32" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            
                            <div className="py-2">
                                <Skeleton className="h-px w-full" />
                            </div>

                            <div className="p-3 rounded-md">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-16" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-5 w-16" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>

                    {/* Compliance Status */}
                    <Card className="border-red-200 dark:border-red-800">
                        <CardHeader>
                            <CardTitle className="text-red-800 dark:text-red-200">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-5 w-32" />
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}