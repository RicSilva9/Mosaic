import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PrismaService } from '../prisma/prisma.service.js';
import { PromptsService } from './prompts.service.js';

describe('PromptsService - findMyDrafts', () => {
  const findAccount = vi.fn();
  const findMany = vi.fn();

  let service: PromptsService;

  const drafts = [
    {
      id: 'draft-2',
      title: 'Second draft',
      description: null,
      content: 'Second prompt',
      status: 'DRAFT',
      createdAt: new Date('2026-09-27T12:00:00Z'),
      updatedAt: new Date('2026-09-27T12:00:00Z'),
    },
    {
      id: 'draft-1',
      title: 'First draft',
      description: 'Description',
      content: 'First prompt',
      status: 'DRAFT',
      createdAt: new Date('2026-09-26T12:00:00Z'),
      updatedAt: new Date('2026-09-26T12:00:00Z'),
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();

    const prisma = {
      account: {
        findUnique: findAccount,
      },
      prompt: {
        findMany,
      },
    } as unknown as PrismaService;

    service = new PromptsService(prisma);

    findAccount.mockResolvedValue({
      userId: 'user-123',
    });

    findMany.mockResolvedValue(drafts);
  });

  it('identifies the authenticated account', async () => {
    await service.findMyDrafts('supabase-user-123');

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

  it('filters drafts by author and status', async () => {
    await service.findMyDrafts('supabase-user-123');

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          authorId: 'user-123',
          status: 'DRAFT',
        },
      }),
    );
  });

  it('requests drafts from newest to oldest', async () => {
    await service.findMyDrafts('supabase-user-123');

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  });

  it('returns the drafts retrieved from the database', async () => {
    const result = await service.findMyDrafts('supabase-user-123');

    expect(result).toEqual(drafts);
  });

  it('returns an empty array when there are no drafts', async () => {
    findMany.mockResolvedValue([]);

    const result = await service.findMyDrafts('supabase-user-123');

    expect(result).toEqual([]);
  });

  it('rejects accounts that do not exist', async () => {
    findAccount.mockResolvedValue(null);

    await expect(service.findMyDrafts('unknown-user')).rejects.toThrow(
      NotFoundException,
    );

    expect(findMany).not.toHaveBeenCalled();
  });

  it('uses the authenticated account instead of another user', async () => {
    findAccount.mockResolvedValue({
      userId: 'authenticated-user',
    });

    await service.findMyDrafts('authenticated-provider-id');

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          authorId: 'authenticated-user',
          status: 'DRAFT',
        },
      }),
    );
  });
});
