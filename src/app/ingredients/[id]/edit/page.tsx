import { Suspense } from "react";
import { Metadata } from "next";
import { getIngredientById } from "@/lib/actions/ingredients";
import { EditIngredientForm } from "@/components/ingredients/forms/edit-ingredient-form";
import { IngredientLoading } from "@/components/ingredients/ingredient-loading";
import { notFound } from "next/navigation";

interface EditIngredientPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: EditIngredientPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const result = await getIngredientById(resolvedParams.id);

    if (!result.success || !result.data) {
        return {
            title: "Edit Ingredient | SmellSmith",
            description: "Edit ingredient details",
        };
    }

    return {
        title: `Edit ${result.data.name} | SmellSmith`,
        description: `Edit details for ${result.data.name}`,
    };
}

async function EditIngredientContent({ params }: EditIngredientPageProps) {
    const resolvedParams = await params;
    const result = await getIngredientById(resolvedParams.id);

    if (!result.success) {
        throw new Error(result.error || "Failed to load ingredient");
    }

    if (!result.data) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-gold">Edit Ingredient</h1>
                <p className="text-muted-foreground">Update {result.data.name} details</p>
            </div>

            <EditIngredientForm ingredient={result.data} />
        </div>
    );
}

export default function EditIngredientPage({ params }: EditIngredientPageProps) {
    return (
        <div className="p-4">
            <Suspense fallback={<IngredientLoading />}>
                <EditIngredientContent params={params} />
            </Suspense>
        </div>
    );
}
