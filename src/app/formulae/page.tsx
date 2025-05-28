import { Suspense } from "react";
import { FormulaeList } from "@/components/formulae/formulae-list";
import { FormulaePageSkeleton } from "@/components/skeletons/formulae-page-skeleton";
import { loadFormulae } from "@/lib/actions/formulae";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Formula Management - SmellSmith",
    description: "Create and analyze fragrance formulations.",
    openGraph: {
        title: "Formula Management - SmellSmith",
        description: "Centralized formula management for fragrance development",
        type: "website",
    },
};

export default async function FormulaePage() {
    const formulae = await loadFormulae();
    return (
        <div className="p-4">
            <Suspense fallback={<FormulaePageSkeleton />}>
                <FormulaeList formulae={formulae} />
            </Suspense>
        </div>
    );
}
