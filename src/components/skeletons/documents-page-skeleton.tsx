import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DocumentsPageSkeleton() {
    return (
        <div className="p-4 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="space-y-4">
                <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-20" />
                </div>

                {/* Search and Filter Controls */}
                <Card>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                <div className="lg:col-span-2 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="lg:col-span-1 space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="lg:col-span-1 space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Document Cards Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }, (_, i) => (
                        <Card key={i} className="h-48">
                            <CardHeader className="space-y-2">
                                <div className="flex items-start justify-between">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-6 w-16" />
                                </div>
                                <Skeleton className="h-4 w-20" />
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <div className="flex items-center justify-between pt-2">
                                    <Skeleton className="h-3 w-24" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-8" />
                                        <Skeleton className="h-8 w-8" />
                                        <Skeleton className="h-8 w-8" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}