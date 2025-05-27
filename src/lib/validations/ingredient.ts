import { z } from "zod";

// Base ingredient schema
export const createIngredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required").max(255, "Name too long"),
  casNumber: z.string().optional(),
  ifraCategory: z.string().optional(),
  maxConcentration: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    }, "Max concentration must be between 0 and 100"),
  safetyNotes: z.string().optional(),
  supplier: z.string().optional(),
  cost: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Cost must be a positive number"),
  odorProfile: z.string().optional(),
  volatility: z.enum(["top", "middle", "base"]).optional(),
});

// Edit ingredient schema (same as create but with id)
export const editIngredientSchema = createIngredientSchema.extend({
  id: z.string().uuid("Invalid ingredient ID"),
});

// Form data types
export type CreateIngredientFormData = z.infer<typeof createIngredientSchema>;
export type EditIngredientFormData = z.infer<typeof editIngredientSchema>;