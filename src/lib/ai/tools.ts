import { Tool, tool } from "ai";
import { z } from "zod";
import { loadFormulaById } from "../actions/formulae";
import { getIngredientById } from "../actions/ingredients";
import { searchDocuments } from "../actions/documents";

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
        documentRetriever: tool({
            description: "Retrieve the most relevant document chunks using a search query and optional filters.",
            parameters: z.object({
                query: z.string().describe("The semantic search query (e.g. 'Are there restrictions on Linalool?')"),
                ingredientIds: z
                    .array(z.string().uuid())
                    .optional()
                    .describe("Optional list of ingredient IDs to filter relevant chunks"),
                topics: z
                    .array(z.string())
                    .optional()
                    .describe("Optional list of topics to narrow down search, like 'toxicity' or 'IFRA'"),
                tags: z
                    .array(z.string())
                    .optional()
                    .describe("Optional freeform tags to filter chunks, e.g. 'top note', 'natural'"),
                limit: z.number().int().min(1).max(20).default(5).optional(),
            }),
            execute: async ({ query, ingredientIds, topics, tags, limit = 5 }) => {
                return await searchDocuments({ query, ingredientIds, topics, tags, limit });
            },
        }),
    };
}
