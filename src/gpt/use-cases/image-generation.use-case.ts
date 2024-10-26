import OpenAI from 'openai';


interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const imageGenerationUseCase = async (openAI: OpenAI, options: Options) => {
    const { prompt, originalImage, maskImage } = options
    console.log({ prompt, originalImage, maskImage });


}