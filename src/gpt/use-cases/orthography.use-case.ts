import OpenAI from 'openai';

interface Options {
    prompt: string;
}

export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt } = options;
    const completion = await openai.chat.completions.create({
        messages: [{
            role: "system",
            content: "You are a helpful assistant."
        }],
        model: "gpt-4o",
        temperature: 0.3,
    });

    console.log({ completion });
    return completion.choices[0];


    // return {
    //     prompt: prompt,
    //     apikey: process.env.OPENAI_API_KEY
    // };
}