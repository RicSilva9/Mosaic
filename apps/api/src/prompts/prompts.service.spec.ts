import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PrismaService } from '../prisma/prisma.service.js';
import { PromptsService } from './prompts.service.js';

describe('PromptsService - createDraft', () => {
  const findAccount = vi.fn();
  const createPrompt = vi.fn();

  let service: PromptsService;

  beforeEach(() => {
    vi.resetAllMocks();

    const prisma = {
      account: {
        findUnique: findAccount,
      },
      prompt: {
        create: createPrompt,
      },
    } as unknown as PrismaService;

    service = new PromptsService(prisma);

    findAccount.mockResolvedValue({
      userId: 'user-123',
    });

    createPrompt.mockResolvedValue({
      id: 'prompt-123',
      title: 'Cinematic landscape',
      description: 'A landscape video prompt',
      content: 'Generate a cinematic landscape.',
      status: 'DRAFT',
      createdAt: new Date('2026-09-27T12:00:00Z'),
      updatedAt: new Date('2026-09-27T12:00:00Z'),
    });
  });

  it('finds the account using the authenticated provider ID', async () => {
    await service.createDraft('supabase-user-123', {
      title: 'Cinematic landscape',
      content: 'Generate a cinematic landscape.',
    });

    expect(findAccount).toHaveBeenCalledWith({
      where: {
        authProvider_authProviderId: {
          authProvider: 'supabase',
          authProviderId: 'supabase-user-123',
        },
      },
      select: {
        userId: true,
      },
    });
  });

  it('creates a draft belonging to the authenticated user', async () => {
    await service.createDraft('supabase-user-123', {
      title: 'Cinematic landscape',
      description: 'A landscape video prompt',
      content: 'Generate a cinematic landscape.',
    });

    expect(createPrompt).toHaveBeenCalledWith({
      data: {
        authorId: 'user-123',
        title: 'Cinematic landscape',
        description: 'A landscape video prompt',
        content: 'Generate a cinematic landscape.',
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
  });

  it('trims title, description and prompt content', async () => {
    await service.createDraft('supabase-user-123', {
      title: '  Cinematic landscape  ',
      description: '  A landscape video prompt  ',
      content: '  Generate a cinematic landscape.  ',
    });

    expect(createPrompt).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          title: 'Cinematic landscape',
          description: 'A landscape video prompt',
          content: 'Generate a cinematic landscape.',
        }),
      }),
    );
  });

  it('accepts an omitted description', async () => {
    await service.createDraft('supabase-user-123', {
      title: 'Cinematic landscape',
      content: 'Generate a cinematic landscape.',
    });

    expect(createPrompt).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          description: null,
        }),
      }),
    );
  });

  it('returns the newly created draft', async () => {
    const result = await service.createDraft('supabase-user-123', {
      title: 'Cinematic landscape',
      content: 'Generate a cinematic landscape.',
    });

    expect(result).toEqual(
      expect.objectContaining({
        id: 'prompt-123',
        status: 'DRAFT',
      }),
    );
  });

  it('rejects accounts that do not exist', async () => {
    findAccount.mockResolvedValue(null);

    await expect(
      service.createDraft('unknown-provider-id', {
        title: 'Cinematic landscape',
        content: 'Generate a cinematic landscape.',
      }),
    ).rejects.toThrow(NotFoundException);

    expect(createPrompt).not.toHaveBeenCalled();
  });

  it('uses the user ID returned by the account lookup', async () => {
    findAccount.mockResolvedValue({
      userId: 'another-authenticated-user',
    });

    await service.createDraft('another-provider-id', {
      title: 'Cinematic landscape',
      content: 'Generate a cinematic landscape.',
    });

    expect(createPrompt).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          authorId: 'another-authenticated-user',
        }),
      }),
    );
  });
});
