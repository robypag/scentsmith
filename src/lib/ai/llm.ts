import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

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
