import OpenAI from 'openai';
import { downloadImageAsPng } from 'src/helpers';


interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const imageGenerationUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt, originalImage, maskImage } = options

    //Todo: Check original image
    const response = await openai.images.generate({
        prompt: prompt,
        model: 'dall-e-3',
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'url'
    });

    // Todo: save image in FS
    const url = await downloadImageAsPng(response.data[0].url)
    return {
        url: url,
        openAIUrl: response.data[0].url,
        revised_response: response.data[0].revised_prompt
    }

}