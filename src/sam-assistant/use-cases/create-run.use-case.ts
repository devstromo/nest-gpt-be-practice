import OpenAI from "openai";

interface Options {
    threadId: string;
    assistantId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
    const { threadId, assistantId = process.env.ASSITANT_KEY } = options;
    const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
        // instructions: // Rewrite the assistant if instructions are provided.
    });
    return run
}