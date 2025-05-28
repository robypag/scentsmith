import { Suspense } from "react";
import { Metadata } from "next";
import { getIngredients, getIngredientStats } from "@/lib/actions/ingredients";
import { IngredientsList } from "@/components/ingredients/ingredients-list";
import { IngredientsLoading } from "@/components/ingredients/ingredients-loading";

export const metadata: Metadata = {
    title: "Ingredient Management - SmellSmith",
    description: "Manage your fragrance ingredient inventory and safety data",
    openGraph: {
        title: "Ingredient Management - SmellSmith",
        description: "Manage your fragrance ingredient inventory and safety data",
        type: "website",
    },
};

export default async function IngredientsPage() {
    const [ingredientsResult, statsResult] = await Promise.all([getIngredients(), getIngredientStats()]);
    if (!ingredientsResult.success) {
        throw new Error(ingredientsResult.error || "Failed to load ingredients");
    }
    if (!statsResult.success) {
        throw new Error(statsResult.error || "Failed to load ingredient statistics");
    }
    return (
        <div className="p-4">
            <Suspense fallback={<IngredientsLoading />}>
                <IngredientsList
                    ingredients={ingredientsResult.data || []}
                    stats={
                        statsResult.data || {
                            totalIngredients: 0,
                            highRiskCount: 0,
                            mediumRiskCount: 0,
                            lowRiskCount: 0,
                            averageCost: 0,
                            totalValue: 0,
                        }
                    }
                />
            </Suspense>
        </div>
    );
}
