import { Injectable } from '@nestjs/common';

@Injectable()
export class GptService {
    // Invoke use cases only
    orthographyCheck() {
        return {
            hola: 'Mundo desde orthographyCheck'
        };
    }
}
