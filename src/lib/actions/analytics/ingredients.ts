"use server";

import { db } from "../../db";
import { ingredients } from "../../db/schema";
import { desc, asc, sql } from "drizzle-orm";

export interface IngredientAnalytics {
    topExpensiveIngredients: Array<{
        id: string;
        name: string;
        cost: string;
        supplier: string | null;
        volatility: string | null;
    }>;
    ingredientsByVolatility: Array<{
        volatility: string;
        count: number;
    }>;
    averageCostByVolatility: Array<{
        volatility: string;
        averageCost: number;
    }>;
}

export async function getIngredientAnalytics(): Promise<IngredientAnalytics> {
    try {
        // Top 10 most expensive ingredients
        const topExpensive = await db
            .select({
                id: ingredients.id,
                name: ingredients.name,
                cost: ingredients.cost,
                supplier: ingredients.supplier,
                volatility: ingredients.volatility,
            })
            .from(ingredients)
            .where(sql`${ingredients.cost} IS NOT NULL`)
            .orderBy(desc(ingredients.cost))
            .limit(10);

        // Count ingredients by volatility
        const volatilityCount = await db
            .select({
                volatility: ingredients.volatility,
                count: sql<number>`count(*)`.as('count'),
            })
            .from(ingredients)
            .where(sql`${ingredients.volatility} IS NOT NULL`)
            .groupBy(ingredients.volatility)
            .orderBy(asc(ingredients.volatility));

        // Average cost by volatility
        const avgCostByVolatility = await db
            .select({
                volatility: ingredients.volatility,
                averageCost: sql<number>`avg(${ingredients.cost})`.as('averageCost'),
            })
            .from(ingredients)
            .where(sql`${ingredients.volatility} IS NOT NULL AND ${ingredients.cost} IS NOT NULL`)
            .groupBy(ingredients.volatility)
            .orderBy(asc(ingredients.volatility));

        return {
            topExpensiveIngredients: topExpensive.map(item => ({
                ...item,
                cost: item.cost || "0",
            })),
            ingredientsByVolatility: volatilityCount.map(item => ({
                volatility: item.volatility || "unknown",
                count: Number(item.count),
            })),
            averageCostByVolatility: avgCostByVolatility.map(item => ({
                volatility: item.volatility || "unknown",
                averageCost: Number(item.averageCost) || 0,
            })),
        };
    } catch (error) {
        console.error("Error fetching ingredient analytics:", error);
        // Return empty data structure on error
        return {
            topExpensiveIngredients: [],
            ingredientsByVolatility: [],
            averageCostByVolatility: [],
        };
    }
}

export async function getTopExpensiveIngredients() {
    try {
        const results = await db
            .select({
                id: ingredients.id,
                name: ingredients.name,
                cost: ingredients.cost,
                supplier: ingredients.supplier,
                volatility: ingredients.volatility,
            })
            .from(ingredients)
            .where(sql`${ingredients.cost} IS NOT NULL`)
            .orderBy(desc(ingredients.cost))
            .limit(10);

        return results.map(item => ({
            ...item,
            cost: parseFloat(item.cost || "0"),
        }));
    } catch (error) {
        console.error("Error fetching top expensive ingredients:", error);
        return [];
    }
}