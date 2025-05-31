import { openai } from "@ai-sdk/openai";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import { EmbeddingChemicalEntry } from "@/types/ingredient";
import { loadAllIngredients } from "../actions/formulae";

export async function summarizeDocument(textContent: string, mimeType: string): Promise<string> {
    try {
        const { text } = await generateText({
            model: openai("gpt-4.1-mini"),
            system: `You are a helpful assistant that summarizes documents in less then 100 words.`,
            maxTokens: 1500,
            temperature: 0.1,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Summarize the following document, focus on the main points.",
                        },
                        {
                            type: "file",
                            data: textContent,
                            mimeType: mimeType,
                        },
                    ],
                },
            ],
        });
        return text;
    } catch (error) {
        throw new Error(`Failed to summarize document: ${error}`);
    }
}

export async function extractDocumentMetadata(documentContents: string): Promise<Record<string, unknown>> {
    try {
        const prompt = `
            Extract structured metadata from the following document text.
            Return a JSON object with keys like "title", "authors", "dates", "company", "keywords", and "language" if available.
            Document text:
            ---
            ${documentContents.substring(0, 4000)}`;

        const { object } = await generateObject({
            model: openai("gpt-4o"),
            system: `You are a helpful assistant extracting structured metadata from documents.`,
            temperature: 0.3,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            schema: z.object({
                title: z.string().optional().describe("The title of the document"),
                authors: z.array(z.string()).optional().describe("The authors of the document, if available"),
                date: z
                    .string()
                    .optional()
                    .describe(
                        "The publication or creation date of the document (any reasonable format, ideally DD-MM-YYYY)",
                    ),
                company: z.string().optional().describe("The company that produced the document, if available"),
                keywords: z.array(z.string()).optional().describe("The keywords of the document"),
                language: z
                    .string()
                    .optional()
                    .describe("The language of the document, preferably as ISO 639-1 code (e.g., 'en', 'it')"),
                topics: z.array(z.string()).optional().describe("Main topics of what this document is about"),
                documentType: z
                    .string()
                    .optional()
                    .describe("The type of document, like 'article', 'report', 'presentation', 'research paper'"),
                style: z
                    .string()
                    .optional()
                    .describe("The style of the document, like 'formal', 'informal', 'academic', 'business'"),
                source: z
                    .string()
                    .optional()
                    .describe("The source or filename of the document, if relevant for provenance"),
            }),
        });
        return object;
    } catch (error) {
        throw new Error(`Failed to extract metadata from document: ${error}`);
    }
}

export async function preloadIngredients(): Promise<EmbeddingChemicalEntry[]> {
    const ingredients = await loadAllIngredients(); // Must return full list from DB
    return ingredients.map((ing) => {
        const searchTerms = [
            ing.name?.toLowerCase(),
            ing.casNumber?.toLowerCase(),
            ing.volatility?.toLowerCase(),
            ing.ifraCategory?.toLowerCase(),
        ].filter((term): term is string => Boolean(term)); // remove undefined/null and type guard
        return {
            id: ing.id,
            searchTerms,
        };
    });
}

export async function tagChunk(
    textChunk: string,
    preloadedChemicals: EmbeddingChemicalEntry[],
): Promise<{
    chemicals: string[];
    topics: string[];
    tags: string[];
}> {
    const ingredientMatches = new Set<string>();
    const ingredients = preloadedChemicals;

    const extractedIngredientNames: string[] = [];
    const extractedTopics: string[] = [];
    const extractedTags: string[] = [];

    try {
        const prompt = `
        Extract from the following perfumery document chunk:

        1. A list of ingredient names or CAS numbers mentioned
        2. Relevant fragrance-related topics (e.g. fixatives, allergens)
        3. Up to 5 tags that summarize or categorize the content

        Respond only in structured JSON.

        --- BEGIN TEXT ---
        ${textChunk}
        --- END TEXT ---
        `;
        const { object: result } = await generateObject({
            model: openai("gpt-4o"),
            schema: z.object({
                ingredients: z.array(z.string()).optional(),
                topics: z.array(z.string()).optional(),
                tags: z.array(z.string()).max(5).optional(),
            }),
            system: `You're an expert in perfumery and chemistry and you are very skilled in extracting ingredients and metadata from perfumery documents.`,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        // Collect LLM ingredients
        extractedIngredientNames.push(...(result.ingredients || []));
        extractedTopics.push(...(result.topics || []));
        extractedTags.push(...(result.tags || []));

        // === Match LLM extracted ingredient names to DB ===
        for (const llmName of extractedIngredientNames) {
            for (const ing of ingredients) {
                if (ing.searchTerms.some((term) => term && llmName.toLowerCase() === term.toLowerCase())) {
                    ingredientMatches.add(ing.id);
                    break;
                }
            }
        }
        return {
            chemicals: Array.from(ingredientMatches),
            topics: [...new Set(extractedTopics)],
            tags: [...new Set(extractedTags)],
        };
    } catch (error) {
        console.warn("GPT metadata extraction failed:", error);
        return {
            chemicals: [],
            topics: [],
            tags: [],
        };
    }
}
