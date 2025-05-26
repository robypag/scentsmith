import { embed, embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const embeddingModel = openai.embedding("text-embedding-3-small");

const generateChunks = async (input: string, size: number = 2500, overlap: number = 200): Promise<string[]> => {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: size,
        chunkOverlap: overlap,
    });
    return await splitter.splitText(input);
};

export const generateEmbeddings = async (value: string): Promise<Array<{ embedding: number[]; content: string }>> => {
    const chunks = await generateChunks(value);
    const { embeddings } = await embedMany({
        model: embeddingModel,
        values: chunks,
    });
    return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
    const input = value.replaceAll("\n", " ");
    const { embedding } = await embed({
        model: embeddingModel,
        value: input,
    });
    return embedding;
};
