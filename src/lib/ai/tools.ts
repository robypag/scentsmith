import { Tool, tool } from "ai";
import { z } from "zod";
import { loadFormulaById } from "../actions/formulae";
import { getIngredientById } from "../actions/ingredients";
import { searchDocuments } from "../actions/documents";

export function getTools(): Record<string, Tool> {
    return {
        formulaReader: tool({
            description:
                "Retrive Formula informations from the internal database by a given formula ID. Always use this tool if you have formula IDs in your context.",
            parameters: z.object({
                formulaId: z.string().uuid().describe("The ID of the formula to retrieve in UUID format"),
            }),
            execute: async ({ formulaId }) => {
                console.log(`[LLM] - Loading formula tool for ${formulaId}`);
                return await loadFormulaById(formulaId);
            },
        }),
        ingredientReader: tool({
            description:
                "Retrive Ingredient informations from the internal database by a given ingredient ID. Always use this tool if you have ingredient IDs in your context.",
            parameters: z.object({
                ingredientId: z.string().uuid().describe("The ID of the ingredient to retrieve in UUID format"),
            }),
            execute: async ({ ingredientId }) => {
                console.log(`[LLM] - Loading ingredient tool for ${ingredientId}`);
                return await getIngredientById(ingredientId);
            },
        }),
        documentReader: tool({
            description: `Retrive additional context from the internal document repository by given Document ID or multiple IDs and the user query. Always use this tool if you have document IDs in your context.`,
            parameters: z.object({
                question: z.string().describe("The user's question"),
                documentIds: z
                    .array(z.string().uuid().describe("The ID of the document to retrieve in UUID format"))
                    .optional()
                    .describe("Optional IDs of a specific document to retrieve"),
            }),
            execute: async ({ question, documentIds }) => {
                console.log(`[LLM] - Loading document tool for ${question}`);
                return await searchDocuments({ query: question, documentIds });
            },
        }),
    };
}
