"use server";

import { formulae, formulaTests, formulaIngredients, ingredients } from "../../db/schema";
import { db } from "../../db";
import { eq, inArray } from "drizzle-orm";
import { FormulaDTO } from "@/types/formula";
import { CreateFormulaFormData, EditFormulaFormData } from "@/lib/validations/formula";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Type for JSONB fields
type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export async function loadFormulae(): Promise<FormulaDTO[]> {
    try {
        const formulas = await db.select().from(formulae);
        const formulaIds = formulas.map((f) => f.id);

        if (formulaIds.length === 0) {
            return [];
        }

        const rawIngredients = await db
            .select({
                id: formulaIngredients.id,
                formulaId: formulaIngredients.formulaId,
                ingredientId: formulaIngredients.ingredientId,
                percentage: formulaIngredients.percentage,
                notes: formulaIngredients.notes,
                createdAt: formulaIngredients.createdAt,
                updatedAt: formulaIngredients.updatedAt,
                ingredient_id: ingredients.id,
                ingredient_name: ingredients.name,
                ingredient_casNumber: ingredients.casNumber,
                ingredient_ifraCategory: ingredients.ifraCategory,
                ingredient_maxConcentration: ingredients.maxConcentration,
                ingredient_safetyNotes: ingredients.safetyNotes,
                ingredient_supplier: ingredients.supplier,
                ingredient_cost: ingredients.cost,
                ingredient_odorProfile: ingredients.odorProfile,
                ingredient_volatility: ingredients.volatility,
                ingredient_embedding: ingredients.embedding,
                ingredient_createdAt: ingredients.createdAt,
                ingredient_updatedAt: ingredients.updatedAt,
            })
            .from(formulaIngredients)
            .innerJoin(ingredients, eq(formulaIngredients.ingredientId, ingredients.id))
            .where(inArray(formulaIngredients.formulaId, formulaIds));

        const tests = await db.select().from(formulaTests).where(inArray(formulaTests.formulaId, formulaIds));

        // Grouping
        const ingredientsByFormulaId = new Map<string, FormulaDTO["ingredients"]>();
        const testsByFormulaId = new Map<string, FormulaDTO["tests"]>();

        for (const row of rawIngredients) {
            const entry = {
                id: row.id,
                formulaId: row.formulaId,
                ingredientId: row.ingredientId,
                percentage: row.percentage,
                notes: row.notes,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
                ingredient: {
                    id: row.ingredient_id,
                    name: row.ingredient_name,
                    casNumber: row.ingredient_casNumber,
                    ifraCategory: row.ingredient_ifraCategory,
                    maxConcentration: row.ingredient_maxConcentration,
                    safetyNotes: row.ingredient_safetyNotes,
                    supplier: row.ingredient_supplier,
                    cost: row.ingredient_cost,
                    odorProfile: row.ingredient_odorProfile,
                    volatility: row.ingredient_volatility,
                    embedding: row.ingredient_embedding,
                    createdAt: row.ingredient_createdAt,
                    updatedAt: row.ingredient_updatedAt,
                },
            };
            const list = ingredientsByFormulaId.get(row.formulaId) ?? [];
            list.push(entry);
            ingredientsByFormulaId.set(row.formulaId, list);
        }

        for (const test of tests) {
            const list = testsByFormulaId.get(test.formulaId) ?? [];
            list.push({
                ...test,
                results: test.results as Json,
            });
            testsByFormulaId.set(test.formulaId, list);
        }

        return formulas.map((f) => ({
            ...f,
            ingredients: ingredientsByFormulaId.get(f.id) ?? [],
            tests: testsByFormulaId.get(f.id) ?? [],
        }));
    } catch (error) {
        throw error instanceof Error ? error : new Error("Error, please try again.");
    }
}

export async function loadFormulaById(id: string): Promise<FormulaDTO> {
    try {
        const [formula] = await db.select().from(formulae).where(eq(formulae.id, id)).limit(1);

        if (!formula) throw new Error("Formula not found");

        const rawIngredients = await db
            .select({
                id: formulaIngredients.id,
                formulaId: formulaIngredients.formulaId,
                ingredientId: formulaIngredients.ingredientId,
                percentage: formulaIngredients.percentage,
                notes: formulaIngredients.notes,
                createdAt: formulaIngredients.createdAt,
                updatedAt: formulaIngredients.updatedAt,
                ingredient_id: ingredients.id,
                ingredient_name: ingredients.name,
                ingredient_casNumber: ingredients.casNumber,
                ingredient_ifraCategory: ingredients.ifraCategory,
                ingredient_maxConcentration: ingredients.maxConcentration,
                ingredient_safetyNotes: ingredients.safetyNotes,
                ingredient_supplier: ingredients.supplier,
                ingredient_cost: ingredients.cost,
                ingredient_odorProfile: ingredients.odorProfile,
                ingredient_volatility: ingredients.volatility,
                ingredient_embedding: ingredients.embedding,
                ingredient_createdAt: ingredients.createdAt,
                ingredient_updatedAt: ingredients.updatedAt,
            })
            .from(formulaIngredients)
            .innerJoin(ingredients, eq(formulaIngredients.ingredientId, ingredients.id))
            .where(eq(formulaIngredients.formulaId, id));

        const ingredientsStructured = rawIngredients.map((row) => ({
            id: row.id,
            formulaId: row.formulaId,
            ingredientId: row.ingredientId,
            percentage: row.percentage,
            notes: row.notes,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            ingredient: {
                id: row.ingredient_id,
                name: row.ingredient_name,
                casNumber: row.ingredient_casNumber,
                ifraCategory: row.ingredient_ifraCategory,
                maxConcentration: row.ingredient_maxConcentration,
                safetyNotes: row.ingredient_safetyNotes,
                supplier: row.ingredient_supplier,
                cost: row.ingredient_cost,
                odorProfile: row.ingredient_odorProfile,
                volatility: row.ingredient_volatility,
                embedding: row.ingredient_embedding,
                createdAt: row.ingredient_createdAt,
                updatedAt: row.ingredient_updatedAt,
            },
        }));

        const tests = await db.select().from(formulaTests).where(eq(formulaTests.formulaId, id));

        const testsWithTypedResults = tests.map((test) => ({
            ...test,
            results: test.results as Json,
        }));

        return {
            ...formula,
            ingredients: ingredientsStructured,
            tests: testsWithTypedResults,
        };
    } catch (error) {
        throw error instanceof Error ? error : new Error("Error, please try again.");
    }
}

export async function createFormula(
    data: CreateFormulaFormData,
): Promise<{ success: boolean; data?: FormulaDTO; error?: string }> {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Authentication required" };
        }

        // Start transaction
        const result = await db.transaction(async (tx) => {
            // Create the formula
            const [newFormula] = await tx
                .insert(formulae)
                .values({
                    name: data.name,
                    version: data.version,
                    description: data.description,
                    createdBy: session.user.id,
                    status: data.status,
                    totalConcentration: data.totalConcentration ? data.totalConcentration : null,
                    batchSize: data.batchSize ? data.batchSize : null,
                    notes: data.notes,
                    expirationDate: data.expirationDate ? new Date(data.expirationDate) : null,
                    isCompliant: data.isCompliant,
                })
                .returning();

            // Create formula ingredients
            if (data.ingredients.length > 0) {
                await tx.insert(formulaIngredients).values(
                    data.ingredients.map((ingredient) => ({
                        formulaId: newFormula.id,
                        ingredientId: ingredient.ingredientId,
                        percentage: ingredient.percentage,
                        notes: ingredient.notes,
                    })),
                );
            }

            // Create formula tests if any
            if (data.tests && data.tests.length > 0) {
                await tx.insert(formulaTests).values(
                    data.tests.map((test) => ({
                        formulaId: newFormula.id,
                        testType: test.testType,
                        results: test.results,
                        passed: test.passed,
                        testDate: new Date(test.testDate),
                        testedBy: session.user.id,
                        notes: test.notes,
                    })),
                );
            }

            return newFormula;
        });

        // Load the complete formula with ingredients and tests
        const completeFormula = await loadFormulaById(result.id);

        revalidatePath("/formulae");
        return { success: true, data: completeFormula };
    } catch (error) {
        console.error("Error creating formula:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create formula",
        };
    }
}

export async function updateFormula(
    data: EditFormulaFormData,
): Promise<{ success: boolean; data?: FormulaDTO; error?: string }> {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Authentication required" };
        }

        // Check if formula exists and user has permission
        const [existingFormula] = await db.select().from(formulae).where(eq(formulae.id, data.id)).limit(1);

        if (!existingFormula) {
            return { success: false, error: "Formula not found" };
        }

        if (existingFormula.createdBy !== session.user.id) {
            return { success: false, error: "Permission denied" };
        }

        // Start transaction
        const result = await db.transaction(async (tx) => {
            // Update the formula
            const [updatedFormula] = await tx
                .update(formulae)
                .set({
                    name: data.name,
                    version: data.version,
                    description: data.description,
                    status: data.status,
                    totalConcentration: data.totalConcentration ? data.totalConcentration : null,
                    batchSize: data.batchSize ? data.batchSize : null,
                    notes: data.notes,
                    expirationDate: data.expirationDate ? new Date(data.expirationDate) : null,
                    isCompliant: data.isCompliant,
                    updatedAt: new Date(),
                })
                .where(eq(formulae.id, data.id))
                .returning();

            // Delete existing ingredients and tests
            await tx.delete(formulaIngredients).where(eq(formulaIngredients.formulaId, data.id));
            await tx.delete(formulaTests).where(eq(formulaTests.formulaId, data.id));

            // Insert new ingredients
            if (data.ingredients.length > 0) {
                await tx.insert(formulaIngredients).values(
                    data.ingredients.map((ingredient) => ({
                        formulaId: data.id,
                        ingredientId: ingredient.ingredientId,
                        percentage: ingredient.percentage,
                        notes: ingredient.notes,
                    })),
                );
            }

            // Insert new tests if any
            if (data.tests && data.tests.length > 0) {
                await tx.insert(formulaTests).values(
                    data.tests.map((test) => ({
                        formulaId: data.id,
                        testType: test.testType,
                        results: test.results,
                        passed: test.passed,
                        testDate: new Date(test.testDate),
                        testedBy: session.user.id,
                        notes: test.notes,
                    })),
                );
            }

            return updatedFormula;
        });

        // Load the complete updated formula
        const completeFormula = await loadFormulaById(result.id);

        revalidatePath("/formulae");
        revalidatePath(`/formulae/${data.id}`);
        return { success: true, data: completeFormula };
    } catch (error) {
        console.error("Error updating formula:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update formula",
        };
    }
}

export async function deleteFormula(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Authentication required" };
        }

        // Check if formula exists and user has permission
        const [existingFormula] = await db.select().from(formulae).where(eq(formulae.id, id)).limit(1);

        if (!existingFormula) {
            return { success: false, error: "Formula not found" };
        }

        if (existingFormula.createdBy !== session.user.id) {
            return { success: false, error: "Permission denied" };
        }

        // Delete formula and related data (cascade)
        await db.transaction(async (tx) => {
            await tx.delete(formulaTests).where(eq(formulaTests.formulaId, id));
            await tx.delete(formulaIngredients).where(eq(formulaIngredients.formulaId, id));
            await tx.delete(formulae).where(eq(formulae.id, id));
        });

        revalidatePath("/formulae");
        return { success: true };
    } catch (error) {
        console.error("Error deleting formula:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete formula",
        };
    }
}

// Helper function to load all ingredients for form dropdowns
export async function loadAllIngredients() {
    try {
        const allIngredients = await db.select().from(ingredients);
        return allIngredients;
    } catch (error) {
        console.error("Error loading ingredients:", error);
        throw error instanceof Error ? error : new Error("Error loading ingredients");
    }
}
