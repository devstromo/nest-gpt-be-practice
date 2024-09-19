import OpenAI from 'openai';

interface Options {
    prompt: string;
}

export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt } = options;
    return {
        prompt: prompt,
        apikey: process.env.OPENAI_API_KEY
    };
}