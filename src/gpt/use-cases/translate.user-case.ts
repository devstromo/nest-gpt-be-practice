import OpenAI from "openai";

interface Options {
    prompt: string;
    lang: string;
}

export const translateUseCase = async (openai: OpenAI, { prompt, lang }: Options) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: `
                Traduce el siguiente texto al idioma ${lang}:${prompt},
                `
            }
        ],
        temperature: 0.8,
        max_tokens: 500
    });


    return response.choices[0].message;
}