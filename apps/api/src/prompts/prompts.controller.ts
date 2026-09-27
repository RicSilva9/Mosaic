import {
  Body,
  Controller,
  Get,
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

  private getProviderId(request: AuthenticatedRequest): string {
    if (!request.user) {
      throw new UnauthorizedException('Authentication is required');
    }

    return request.user.providerId;
  }

  @Post()
  @UseGuards(AuthGuard)
  async createDraft(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreatePromptDto,
  ) {
    return this.promptsService.createDraft(this.getProviderId(request), body);
  }

  @Get('me/drafts')
  @UseGuards(AuthGuard)
  async findMyDrafts(@Req() request: AuthenticatedRequest) {
    return this.promptsService.findMyDrafts(this.getProviderId(request));
  }
}
