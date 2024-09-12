import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';

@Injectable()
export class GptService {
    // Invoke use cases only
    async orthographyCheck() {
        return await orthographyCheckUseCase();
    }
}
