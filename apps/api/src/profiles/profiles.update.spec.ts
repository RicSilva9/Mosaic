import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProfilesService } from './profiles.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('ProfilesService - updateMyProfile', () => {
  const findAccount = vi.fn();
  const updateProfile = vi.fn();

  let service: ProfilesService;

  beforeEach(() => {
    vi.clearAllMocks();

    const prisma = {
      account: {
        findUnique: findAccount,
      },
      profile: {
        update: updateProfile,
      },
    } as unknown as PrismaService;

    service = new ProfilesService(prisma);

    findAccount.mockResolvedValue({
      userId: 'user-123',
    });

    updateProfile.mockResolvedValue({
      username: 'ricardo',
      displayName: 'Ricardo Silva',
      bio: 'Frontend developer',
      avatarKey: null,
    });
  });

  it('updates the display name of the authenticated user', async () => {
    const result = await service.updateMyProfile('supabase-user-123', {
      displayName: '  Ricardo Silva  ',
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

    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          userId: 'user-123',
        },
        data: {
          displayName: 'Ricardo Silva',
        },
      }),
    );

    expect(result.displayName).toBe('Ricardo Silva');
  });

  it('updates the biography', async () => {
    await service.updateMyProfile('supabase-user-123', {
      bio: '  Frontend developer  ',
    });

    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          bio: 'Frontend developer',
        },
      }),
    );
  });

  it('accepts an empty biography', async () => {
    await service.updateMyProfile('supabase-user-123', {
      bio: '',
    });

    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          bio: '',
        },
      }),
    );
  });

  it('returns 404 when the account does not exist', async () => {
    findAccount.mockResolvedValue(null);

    await expect(
      service.updateMyProfile('unknown-user', {
        displayName: 'Ricardo',
      }),
    ).rejects.toThrow(NotFoundException);

    expect(updateProfile).not.toHaveBeenCalled();
  });

  it('updates only the profile linked to the authenticated account', async () => {
    findAccount.mockResolvedValue({
      userId: 'authenticated-user',
    });

    await service.updateMyProfile('authenticated-provider-id', {
      displayName: 'New Name',
    });

    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          userId: 'authenticated-user',
        },
      }),
    );
  });
});
