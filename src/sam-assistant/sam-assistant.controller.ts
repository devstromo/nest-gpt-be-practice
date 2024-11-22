import { Body, Controller, Post } from '@nestjs/common';
import { SamAssistantService } from './sam-assistant.service';
import { ImageGenerationDto } from 'src/gpt/dtos';
import { QuestionDto } from './dtos/question.dto';

@Controller('sam-assistant')
export class SamAssistantController {
  constructor(private readonly samAssistantService: SamAssistantService) { }

  @Post('create-thread')
  async createThread() {
    return this.samAssistantService.createThread();
  }

  @Post('user-thread')
  async userQuestion(
    @Body() quesitonDto: QuestionDto
  ) {
    return quesitonDto;
  }
}
