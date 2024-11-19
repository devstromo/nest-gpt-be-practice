import { Controller } from '@nestjs/common';
import { SamAssistantService } from './sam-assistant.service';

@Controller('sam-assistant')
export class SamAssistantController {
  constructor(private readonly samAssistantService: SamAssistantService) {}
}
