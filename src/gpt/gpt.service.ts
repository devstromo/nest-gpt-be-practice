import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {
    // Invoke use cases only
    async orthographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyCheckUseCase({ prompt: orthographyDto.prompt });
    }
}
