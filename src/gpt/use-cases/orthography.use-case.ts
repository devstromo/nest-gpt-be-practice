import OpenAI from 'openai';

interface Options {
    prompt: string;
}

export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt } = options;
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `
                Te serán proveídos textos con posibles errores ortográficos y gramaticales,
                Debes responder en formato JSON,
                tu tarea es corregirlos y retornar información, soluciones,
                también debes dar un porcentaje de acierto por el usuario,

                Si no hay errores debes retornanr un mensaje de felicitaciones
                
                `
            },
            {
                role: "user",
                content: prompt
            }
        ],
        model: "gpt-4o",
        temperature: 0.3,
        max_tokens: 150,
    });

    console.log({ completion });
    return completion.choices[0];


    // return {
    //     prompt: prompt,
    //     apikey: process.env.OPENAI_API_KEY
    // };
}