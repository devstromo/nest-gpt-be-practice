import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Invoke use cases only
    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyCheckUseCase({ prompt: orthographyDto.prompt });
    }
}
