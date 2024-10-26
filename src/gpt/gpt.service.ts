import * as path from "path";
import * as fs from "fs";

import { Injectable, NotFoundException } from '@nestjs/common';

import OpenAI from 'openai';

import { audioToTextUseCase, imageGenerationUseCase, orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase, textToAudioUseCase, translateUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
import { AudioToTextDto } from './dtos/audio-to-text.dto';
import { ImageGenerationDto } from './dtos/image-generation.dto';


@Injectable()
export class GptService {
    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Invoke use cases only
    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyCheckUseCase(this.openai, { prompt: orthographyDto.prompt });
    }

    async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
        return await prosConsDicusserUseCase(this.openai, { prompt });
    }
    async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
        return await prosConsDicusserStreamUseCase(this.openai, { prompt });
    }

    async translate({ prompt, lang }: TranslateDto) {
        return await translateUseCase(this.openai, { prompt, lang });
    }

    async textToAudio({ prompt, voice }: TextToAudioDto) {
        return await textToAudioUseCase(this.openai, { prompt, voice });
    }

    async textToAudioGetter(fileId: string) {
        const speechFile = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`);
        if (!fs.existsSync(speechFile)) {
            throw new NotFoundException(`File ${fileId} not found`);
        }

        return speechFile;
    }

    async audioToText(audioFile: Express.Multer.File, audioToTextDto: AudioToTextDto) {
        const { prompt } = audioToTextDto;
        return await audioToTextUseCase(this.openai, { prompt, audioFile });
    }

    async imageGeneration(imageGenerationDto: ImageGenerationDto) {
        return await imageGenerationUseCase(this.openai, { ...imageGenerationDto });
    }

    getGeneratedImage(fileName: string) {
        const imageFile = path.resolve(__dirname, '../../generated/images/', fileName);
        if (!fs.existsSync(imageFile)) {
            throw new NotFoundException(`File ${fileName} not found`);
        }

        return imageFile;
    }
}
