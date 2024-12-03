import * as fs from 'fs';

import OpenAI from 'openai';
import { downloadImageAsPng } from 'src/helpers';


interface Options {
    imageFile: Express.Multer.File;
    prompt: string;
}

export const imageToTextUseCase = async (openai: OpenAI, options: Options) => {
    const { imageFile, prompt } = options;
    const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        max_tokens: 1000,
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: prompt ?? 'Qué logras ver en la imagen?',
                    },
                    {
                        type: 'image_url',
                        image_url: {
                            url: '',
                        }
                    }
                ]
            }
        ]

    });
};