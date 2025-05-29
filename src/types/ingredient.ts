import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { ingredients } from "@/lib/db/schema";

// Create Zod schema from Drizzle table
export const ingredientSchema = createSelectSchema(ingredients);

// Export the inferred TypeScript type
export type IngredientDTO = z.infer<typeof ingredientSchema>;
