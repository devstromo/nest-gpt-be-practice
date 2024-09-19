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
                Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
                Las palabras usadas deben existir en el diccionario de la Real Academia Española,
                Debes responder en formato JSON,
                tu tarea es corregirlos y retornar información, soluciones,
                también debes dar un porcentaje de acierto por el usuario,

                Si no hay errores debes retornanr un mensaje de felicitaciones

                Ejemplo de salida:
                {
                    userScore: number,
                    errors: string[], // ['error1' ->'solución'],
                    message: string, // Usa emojis y texto para felicitar al usuario
                }
                
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