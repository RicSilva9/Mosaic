import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PrismaService } from '../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import { ProfilesService } from './profiles.service.js';

describe('ProfilesService - updateMyProfile', () => {
  const findAccount = vi.fn();
  const updateProfile = vi.fn();
  const getPublicUrl = vi.fn();

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

    const storage = {
      getPublicUrl,
    } as unknown as StorageService;

    getPublicUrl.mockImplementation(
      (key: string) => `https://storage.example.com/avatars/${key}`,
    );

    service = new ProfilesService(prisma, storage);

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
    expect(result.avatarUrl).toBeNull();
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

  it('preserves and returns an existing avatar', async () => {
    updateProfile.mockResolvedValue({
      username: 'ricardo',
      displayName: 'Ricardo Silva',
      bio: null,
      avatarKey: 'user-123/photo.webp',
    });

    const result = await service.updateMyProfile('supabase-user-123', {
      displayName: 'Ricardo Silva',
    });

    expect(result.avatarKey).toBe('user-123/photo.webp');

    expect(result.avatarUrl).toBe(
      'https://storage.example.com/avatars/user-123/photo.webp',
    );
  });
});
