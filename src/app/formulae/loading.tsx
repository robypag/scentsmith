import FormulaCardSkeleton from "@/components/skeletons/formula-card-skeleton";

export default function Loading() {
    return (
        <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <FormulaCardSkeleton key={i} />
            ))}
        </div>
    );
}
