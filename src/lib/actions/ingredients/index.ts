"use server";

import { ingredients } from "../../db/schema";
import { db } from "../../db";
import { eq, ilike, or, asc, and } from "drizzle-orm";
import { Ingredient, NewIngredient } from "../../db/schema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getIngredients(): Promise<{ success: boolean; data?: Ingredient[]; error?: string }> {
    try {
        const allIngredients = await db.select().from(ingredients).orderBy(asc(ingredients.name));
        return { success: true, data: allIngredients };
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        return { success: false, error: "Failed to fetch ingredients" };
    }
}

export async function searchIngredients(searchTerm: string, volatilityFilter?: string): Promise<{ success: boolean; data?: Ingredient[]; error?: string }> {
    try {
        const conditions = [];
        
        if (searchTerm) {
            conditions.push(
                or(
                    ilike(ingredients.name, `%${searchTerm}%`),
                    ilike(ingredients.odorProfile, `%${searchTerm}%`),
                    ilike(ingredients.casNumber, `%${searchTerm}%`)
                )
            );
        }
        
        if (volatilityFilter && volatilityFilter !== "all") {
            conditions.push(eq(ingredients.volatility, volatilityFilter));
        }
        
        let results;
        if (conditions.length === 0) {
            results = await db.select().from(ingredients).orderBy(asc(ingredients.name));
        } else {
            results = await db.select()
                .from(ingredients)
                .where(conditions.length === 1 ? conditions[0] : and(...conditions))
                .orderBy(asc(ingredients.name));
        }
        
        return { success: true, data: results };
    } catch (error) {
        console.error("Error searching ingredients:", error);
        return { success: false, error: "Failed to search ingredients" };
    }
}

export async function getIngredientById(id: string): Promise<{ success: boolean; data?: Ingredient; error?: string }> {
    try {
        const ingredient = await db.select().from(ingredients).where(eq(ingredients.id, id)).limit(1);
        
        if (ingredient.length === 0) {
            return { success: false, error: "Ingredient not found" };
        }
        
        return { success: true, data: ingredient[0] };
    } catch (error) {
        console.error("Error fetching ingredient:", error);
        return { success: false, error: "Failed to fetch ingredient" };
    }
}

export async function createIngredient(data: NewIngredient): Promise<{ success: boolean; data?: Ingredient; error?: string }> {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Authentication required" };
        }

        const [newIngredient] = await db.insert(ingredients).values(data).returning();
        
        revalidatePath("/ingredients");
        return { success: true, data: newIngredient };
    } catch (error) {
        console.error("Error creating ingredient:", error);
        return { success: false, error: "Failed to create ingredient" };
    }
}

export async function updateIngredient(id: string, data: Partial<NewIngredient>): Promise<{ success: boolean; data?: Ingredient; error?: string }> {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Authentication required" };
        }

        const [updatedIngredient] = await db
            .update(ingredients)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(ingredients.id, id))
            .returning();

        if (!updatedIngredient) {
            return { success: false, error: "Ingredient not found" };
        }

        revalidatePath("/ingredients");
        revalidatePath(`/ingredients/${id}`);
        return { success: true, data: updatedIngredient };
    } catch (error) {
        console.error("Error updating ingredient:", error);
        return { success: false, error: "Failed to update ingredient" };
    }
}

export async function deleteIngredient(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Authentication required" };
        }

        // Check if ingredient is used in any formulas
        // This would require checking formulaIngredients table
        // For now, we'll proceed with deletion

        await db.delete(ingredients).where(eq(ingredients.id, id));

        revalidatePath("/ingredients");
        return { success: true };
    } catch (error) {
        console.error("Error deleting ingredient:", error);
        return { success: false, error: "Failed to delete ingredient" };
    }
}

export async function getIngredientStats(): Promise<{ 
    success: boolean; 
    data?: { 
        totalIngredients: number;
        highRiskCount: number;
        mediumRiskCount: number;
        lowRiskCount: number;
        averageCost: number;
        totalValue: number;
    }; 
    error?: string 
}> {
    try {
        const allIngredients = await db.select().from(ingredients);
        
        const stats = {
            totalIngredients: allIngredients.length,
            highRiskCount: allIngredients.filter(ing => 
                ing.safetyNotes?.toLowerCase().includes("phototoxic") || 
                ing.safetyNotes?.toLowerCase().includes("allergen")
            ).length,
            mediumRiskCount: allIngredients.filter(ing => 
                ing.safetyNotes?.toLowerCase().includes("sparingly") || 
                ing.safetyNotes?.toLowerCase().includes("sensitizer")
            ).length,
            lowRiskCount: allIngredients.filter(ing => 
                !ing.safetyNotes?.toLowerCase().includes("phototoxic") && 
                !ing.safetyNotes?.toLowerCase().includes("allergen") &&
                !ing.safetyNotes?.toLowerCase().includes("sparingly") && 
                !ing.safetyNotes?.toLowerCase().includes("sensitizer")
            ).length,
            averageCost: allIngredients.reduce((sum, ing) => sum + (parseFloat(ing.cost || "0")), 0) / allIngredients.length,
            totalValue: allIngredients.reduce((sum, ing) => sum + (parseFloat(ing.cost || "0")), 0)
        };
        
        return { success: true, data: stats };
    } catch (error) {
        console.error("Error fetching ingredient stats:", error);
        return { success: false, error: "Failed to fetch ingredient statistics" };
    }
}