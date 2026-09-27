import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePromptDto } from './dto/create-prompt.dto.js';

@Injectable()
export class PromptsService {
  constructor(private readonly prisma: PrismaService) {}

  async createDraft(authProviderId: string, input: CreatePromptDto) {
    const account = await this.prisma.account.findUnique({
      where: {
        authProvider_authProviderId: {
          authProvider: 'supabase',
          authProviderId,
        },
      },
      select: {
        userId: true,
      },
    });

    if (!account) {
      throw new NotFoundException('Mosaic account not found');
    }

    return this.prisma.prompt.create({
      data: {
        authorId: account.userId,
        title: input.title.trim(),
        description: input.description?.trim() ?? null,
        content: input.content.trim(),
        status: 'DRAFT',
      },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
