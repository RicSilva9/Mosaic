import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/guards/auth.guard.js';
import type { AuthenticatedRequest } from '../auth/guards/auth.guard.js';
import { CreatePromptDto } from './dto/create-prompt.dto.js';
import { PromptsService } from './prompts.service.js';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createDraft(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreatePromptDto,
  ) {
    if (!request.user) {
      throw new UnauthorizedException('Authentication is required');
    }

    return this.promptsService.createDraft(request.user.providerId, body);
  }
}
