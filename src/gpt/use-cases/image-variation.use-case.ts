import * as fs from 'fs';
import * as path from 'path';

import OpenAI from 'openai';
import { downloadBase64ImageAsPng, downloadImageAsPng } from 'src/helpers';


interface Options {
    baseImage: string;
}

export const imageVariationUseCase = async (openai: OpenAI, options: Options) => {
    const { baseImage } = options

    return baseImage;
};