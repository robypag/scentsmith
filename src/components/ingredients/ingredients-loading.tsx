import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function IngredientsLoading() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-6 w-12" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="inventory" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="safety">Safety Data</TabsTrigger>
                    <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="inventory" className="space-y-4">
                    {/* Search and Filter */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                <div className="lg:col-span-3 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ingredient Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-2">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <Skeleton className="h-5 w-16" />
                                            <Skeleton className="h-5 w-20" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />

                                    <div className="grid grid-cols-2 gap-2">
                                        {Array.from({ length: 4 }).map((_, j) => (
                                            <div key={j} className="space-y-1">
                                                <Skeleton className="h-3 w-16" />
                                                <Skeleton className="h-3 w-12" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-2 bg-amber-50 rounded-md dark:bg-amber-900/30 space-y-1">
                                        <Skeleton className="h-3 w-20" />
                                        <Skeleton className="h-3 w-full" />
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Skeleton className="h-8 flex-1" />
                                        <Skeleton className="h-8 flex-1" />
                                        <Skeleton className="h-8 w-8" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="safety" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-6 w-48" />
                            </CardTitle>
                            <CardDescription>
                                <Skeleton className="h-4 w-96" />
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <div key={i}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Skeleton className="h-4 w-4" />
                                            <Skeleton className="h-5 w-48" />
                                        </div>
                                        <div className="space-y-2">
                                            {Array.from({ length: 2 }).map((_, j) => (
                                                <div key={j} className="p-3 border rounded-lg">
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-1">
                                                            <Skeleton className="h-4 w-32" />
                                                            <Skeleton className="h-3 w-48" />
                                                        </div>
                                                        <Skeleton className="h-5 w-16" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="costs" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-6 w-32" />
                            </CardTitle>
                            <CardDescription>
                                <Skeleton className="h-4 w-64" />
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <div key={i} className="p-4 border rounded-lg">
                                        <Skeleton className="h-5 w-48 mb-2" />
                                        <div className="space-y-2">
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <div key={j} className="flex justify-between">
                                                    <Skeleton className="h-3 w-24" />
                                                    <Skeleton className="h-3 w-16" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}