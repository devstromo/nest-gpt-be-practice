import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

import { InternalServerErrorException } from "@nestjs/common";


/*************  ✨ Codeium Command ⭐  *************/
/**
 * Download an image from a given URL and save it as a PNG in the './generated/images/'
 * folder. The image name is the current timestamp in milliseconds.
 *
 * @param url The URL of the image
 * @returns The path to the saved image
 */

/******  ec533fc8-8300-4c3d-b992-2e5b0ba2da1d  *******/
export const downloadImageAsPng = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new InternalServerErrorException('Download image was not posible');
    }

    const folderPath = path.resolve('./', './generated/images/');

    fs.mkdirSync(folderPath, { recursive: true });

    const imageNamePng = `${new Date().getTime()}.png`;
    const buffer = Buffer.from(await response.arrayBuffer());
    // fs.writeFileSync(`${folderPath}/${imageNamePng}`, buffer);
    const completePath = path.join(folderPath, imageNamePng);
    await sharp(buffer)
        .png()
        .ensureAlpha()
        .toFile(completePath);

    return completePath
}

export const downloadBase64ImageAsPng = async (base64Image: string) => {

    // Remover encabezado
    base64Image = base64Image.split(';base64,').pop();
    const imageBuffer = Buffer.from(base64Image, 'base64');

    const folderPath = path.resolve('./', './generated/images/');
    fs.mkdirSync(folderPath, { recursive: true });

    const imageNamePng = `${new Date().getTime()}-64.png`;

    const completePath = path.join(folderPath, imageNamePng);

    // Transformar a RGBA, png // Así lo espera OpenAI
    await sharp(imageBuffer)
        .png()
        .ensureAlpha()
        .toFile(completePath);

    return completePath;

}