import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadFormulaById } from "@/lib/actions/formulae";
import { FormulaDetails } from "@/components/formulae/formula-details";
import { FormulaDetailsSkeleton } from "@/components/skeletons/formula-details-skeleton";

interface FormulaDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: FormulaDetailsPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const formula = await loadFormulaById(resolvedParams.id);
    if (!formula) {
        return {
            title: "Formula Not Found - SmellSmith",
            description: "The requested formula could not be found.",
        };
    }
    return {
        title: `${formula.name} v${formula.version} - SmellSmith`,
        description:
            formula.description ||
            `View details for ${formula.name}, a ${formula.status} formula with ${formula.totalConcentration}% concentration.`,
        openGraph: {
            title: `${formula.name} v${formula.version}`,
            description: formula.description || `Fragrance formula details`,
            type: "website",
        },
    };
}

async function FormulaDetailsContent({ params }: FormulaDetailsPageProps) {
    const resolvedParams = await params;
    const formula = await loadFormulaById(resolvedParams.id);

    if (!formula) {
        notFound();
    }

    return <FormulaDetails formula={formula} />;
}

export default function FormulaDetailsPage({ params }: FormulaDetailsPageProps) {
    return (
        <Suspense fallback={<FormulaDetailsSkeleton />}>
            <FormulaDetailsContent params={params} />
        </Suspense>
    );
}