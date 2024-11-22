import OpenAI from "openai";

export const CreateThreadUseCase = async (openai: OpenAI) => {
    const thread = await openai.beta.threads.create();
    console.log({ thread });
    return thread;

} 