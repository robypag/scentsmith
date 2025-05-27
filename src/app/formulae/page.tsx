import { Suspense } from "react";
import { FormulaeList } from "@/components/formulae/formulae-list";
import { FormulaePageSkeleton } from "@/components/skeletons/formulae-page-skeleton";
import { loadFormulae } from "@/lib/actions/formulae";

export default async function FormulaePage() {
    const formulae = await loadFormulae();
    return (
        <Suspense fallback={<FormulaePageSkeleton />}>
            <FormulaeList formulae={formulae} />
        </Suspense>
    );
}
