import { z } from "zod";

// Ingredient schema for formula creation/editing
export const formulaIngredientSchema = z.object({
  ingredientId: z.string().uuid("Please select a valid ingredient"),
  percentage: z.string()
    .min(1, "Percentage is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0 && num <= 100;
    }, "Percentage must be between 0.01 and 100"),
  notes: z.string().optional(),
});

// Test schema for formula creation/editing
export const formulaTestSchema = z.object({
  testType: z.string().min(1, "Test type is required"),
  results: z.any().optional(),
  passed: z.boolean().optional(),
  testDate: z.string().min(1, "Test date is required"),
  notes: z.string().optional(),
});

// Base formula schema
export const createFormulaSchema = z.object({
  name: z.string().min(1, "Formula name is required").max(255, "Name too long"),
  version: z.string().min(1, "Version is required"),
  description: z.string().optional(),
  status: z.enum(["draft", "testing", "approved", "archived"]),
  totalConcentration: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    }, "Total concentration must be between 0 and 100"),
  batchSize: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Batch size must be greater than 0"),
  notes: z.string().optional(),
  expirationDate: z.string().optional(),
  isCompliant: z.boolean(),
  ingredients: z.array(formulaIngredientSchema).min(1, "At least one ingredient is required"),
  tests: z.array(formulaTestSchema),
});

// Edit formula schema (same as create but with id)
export const editFormulaSchema = createFormulaSchema.extend({
  id: z.string().uuid("Invalid formula ID"),
});

// Form data types
export type CreateFormulaFormData = z.infer<typeof createFormulaSchema>;
export type EditFormulaFormData = z.infer<typeof editFormulaSchema>;
export type FormulaIngredientFormData = z.infer<typeof formulaIngredientSchema>;
export type FormulaTestFormData = z.infer<typeof formulaTestSchema>;