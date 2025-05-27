import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { formulae, formulaIngredients, ingredients, formulaTests } from "@/lib/db/schema";

// Step 1: Base Zod schemas
const formulaSchema = createSelectSchema(formulae);
const ingredientSchema = createSelectSchema(ingredients);
const formulaIngredientSchema = createSelectSchema(formulaIngredients);
const formulaTestSchema = createSelectSchema(formulaTests);

// Step 2: Extend formulaIngredient to include the full ingredient object
const formulaIngredientWithIngredientSchema = formulaIngredientSchema.extend({
    ingredient: ingredientSchema,
});

// Step 3: Create the full FormulaDTO schema
export const formulaDTOSchema = formulaSchema.extend({
    ingredients: z.array(formulaIngredientWithIngredientSchema),
    tests: z.array(formulaTestSchema),
});

// Step 4: Export the inferred TypeScript type
export type FormulaDTO = z.infer<typeof formulaDTOSchema>;
