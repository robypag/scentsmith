export default function FormulaCardSkeleton() {
    return (
        <div className="animate-pulse border rounded-lg p-4 shadow-sm space-y-4">
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-3 w-1/2 bg-muted rounded" />
            <div className="h-16 bg-muted rounded" />
            <div className="flex gap-2">
                <div className="h-6 w-20 bg-muted rounded" />
                <div className="h-6 w-20 bg-muted rounded" />
                <div className="h-6 w-6 bg-muted rounded-full" />
            </div>
        </div>
    );
}
