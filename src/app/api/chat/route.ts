import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { GENERAL_CHAT_PROMPT } from "@/lib/ai/prompts/basic-chat-prompt";
import { getTools } from "@/lib/ai/tools";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, context } = await req.json();
    const systemPrompt = context
        ? `${GENERAL_CHAT_PROMPT}\n<context>${JSON.stringify(context)}</context>\n`
        : GENERAL_CHAT_PROMPT;

    console.log(systemPrompt);

    const result = streamText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        messages,
        temperature: 0.2,
        maxTokens: 2000,
        maxSteps: 5,
        maxRetries: 2,
        tools: getTools(),
        onError: (error) => {
            console.error("Error streaming text:", error);
        },
    });
    return result.toDataStreamResponse({
        getErrorMessage: (error) => {
            if (error == null) {
                return "unknown error";
            }
            if (typeof error === "string") {
                return error;
            }
            if (error instanceof Error) {
                return error.message;
            }
            return JSON.stringify(error);
        },
    });
}
