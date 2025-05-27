import { Metadata } from "next";
import { CreateIngredientForm } from "@/components/ingredients/forms/create-ingredient-form";

export const metadata: Metadata = {
    title: "Create Ingredient | SmellSmith",
    description: "Add a new fragrance ingredient to your inventory",
};

export default function CreateIngredientPage() {
    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-gold">Create New Ingredient</h1>
                <p className="text-muted-foreground">Add a new fragrance ingredient to your inventory</p>
            </div>
            
            <CreateIngredientForm />
        </div>
    );
}