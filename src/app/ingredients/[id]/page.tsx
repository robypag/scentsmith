import { Suspense } from "react";
import { Metadata } from "next";
import { getIngredientById } from "@/lib/actions/ingredients";
import { IngredientDetails } from "@/components/ingredients/ingredient-details";
import { IngredientLoading } from "@/components/ingredients/ingredient-loading";
import { notFound } from "next/navigation";

interface IngredientPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: IngredientPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const result = await getIngredientById(resolvedParams.id);

    if (!result.success || !result.data) {
        return {
            title: "Ingredient Not Found | SmellSmith",
            description: "The requested ingredient could not be found.",
        };
    }

    return {
        title: `${result.data.name} | SmellSmith`,
        description: `View details for ${result.data.name} - ${result.data.odorProfile || "fragrance ingredient"}`,
    };
}

async function IngredientContent({ params }: IngredientPageProps) {
    const resolvedParams = await params;
    const result = await getIngredientById(resolvedParams.id);

    if (!result.success) {
        throw new Error(result.error || "Failed to load ingredient");
    }

    if (!result.data) {
        notFound();
    }

    return <IngredientDetails ingredient={result.data} />;
}

export default function IngredientPage({ params }: IngredientPageProps) {
    return (
        <div className="p-4">
            <Suspense fallback={<IngredientLoading />}>
                <IngredientContent params={params} />
            </Suspense>
        </div>
    );
}
