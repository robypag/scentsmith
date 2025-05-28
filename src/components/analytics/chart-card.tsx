import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

function ChartLoadingSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>
            <Skeleton className="h-[300px] w-full" />
        </div>
    );
}

export function ChartCard({ title, description, children, className }: ChartCardProps) {
    return (
        <Card className={className}>
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{title}</CardTitle>
                {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
            </CardHeader>
            <CardContent>
                <Suspense fallback={<ChartLoadingSkeleton />}>{children}</Suspense>
            </CardContent>
        </Card>
    );
}

interface AsyncChartCardProps<T = unknown> {
    title: string;
    description?: string;
    className?: string;
    dataPromise: Promise<T>;
    renderChart: (data: T) => React.ReactNode;
}

export function AsyncChartCard<T = unknown>({
    title,
    description,
    className,
    dataPromise,
    renderChart,
}: AsyncChartCardProps<T>) {
    return (
        <ChartCard title={title} description={description} className={className}>
            <AsyncChartContent dataPromise={dataPromise} renderChart={renderChart} />
        </ChartCard>
    );
}

async function AsyncChartContent<T = unknown>({
    dataPromise,
    renderChart,
}: {
    dataPromise: Promise<T>;
    renderChart: (data: T) => React.ReactNode;
}) {
    try {
        const data = await dataPromise;
        return <>{renderChart(data)}</>;
    } catch {
        return (
            <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
                <p>Failed to load chart data</p>
            </div>
        );
    }
}
