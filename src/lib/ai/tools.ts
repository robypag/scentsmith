import { Tool, tool } from "ai";
import { z } from "zod";
import { loadFormulaById } from "../actions/formulae";
import { getIngredientById } from "../actions/ingredients";

export function getTools(): Record<string, Tool> {
    return {
        formulaReader: tool({
            description: "Retrive Formula informations from the internal database by a given formula ID",
            parameters: z.object({
                formulaId: z.string().uuid().describe("The ID of the formula to retrieve in UUID format"),
            }),
            execute: async ({ formulaId }) => await loadFormulaById(formulaId),
        }),
        ingredientReader: tool({
            description: "Retrive Ingredient informations from the internal database by a given ingredient ID",
            parameters: z.object({
                ingredientId: z.string().uuid().describe("The ID of the ingredient to retrieve in UUID format"),
            }),
            execute: async ({ ingredientId }) => await getIngredientById(ingredientId),
        }),
    };
}
