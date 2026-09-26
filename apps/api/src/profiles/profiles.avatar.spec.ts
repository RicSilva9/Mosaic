import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import sharp from 'sharp';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { PrismaService } from '../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import { ProfilesService } from './profiles.service.js';

describe('ProfilesService - avatars', () => {
  const findAccount = vi.fn();
  const findProfile = vi.fn();
  const updateProfile = vi.fn();
  const upload = vi.fn();
  const remove = vi.fn();
  const getPublicUrl = vi.fn();

  let service: ProfilesService;
  let image: Buffer;

  const profile = {
    username: 'ricardo',
    displayName: 'Ricardo',
    bio: null,
    avatarKey: null as string | null,
  };

  beforeAll(async () => {
    image = await sharp({
      create: {
        width: 20,
        height: 20,
        channels: 3,
        background: '#663399',
      },
    })
      .jpeg()
      .toBuffer();
  });

  beforeEach(() => {
    vi.clearAllMocks();

    findAccount.mockResolvedValue({
      userId: 'user-123',
    });

    findProfile.mockResolvedValue({
      avatarKey: null,
    });

    updateProfile.mockImplementation(
      async (args: {
        data: {
          avatarKey: string | null;
        };
      }) => ({
        ...profile,
        avatarKey: args.data.avatarKey,
      }),
    );

    upload.mockResolvedValue('uploaded-avatar.webp');

    remove.mockResolvedValue(undefined);

    getPublicUrl.mockImplementation(
      (key: string) => `https://storage.example.com/${key}`,
    );

    const prisma = {
      account: {
        findUnique: findAccount,
      },
      profile: {
        findUnique: findProfile,
        update: updateProfile,
      },
    } as unknown as PrismaService;

    const storage = {
      upload,
      remove,
      getPublicUrl,
    } as unknown as StorageService;

    service = new ProfilesService(prisma, storage);
  });

  it('uploads an avatar for the authenticated user', async () => {
    const result = await service.uploadMyAvatar('supabase-user-123', image);

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

    expect(upload).toHaveBeenCalledWith(
      expect.stringMatching(/^user-123\/[a-f0-9-]+\.webp$/),
      expect.any(Buffer),
      'image/webp',
    );

    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          userId: 'user-123',
        },
        data: {
          avatarKey: expect.stringMatching(/^user-123\/[a-f0-9-]+\.webp$/),
        },
      }),
    );

    expect(result.avatarUrl).toContain('https://storage.example.com/');
  });

  it('removes the previous avatar after replacement', async () => {
    findProfile.mockResolvedValue({
      avatarKey: 'user-123/old.webp',
    });

    await service.uploadMyAvatar('supabase-user-123', image);

    expect(remove).toHaveBeenCalledWith('user-123/old.webp');

    expect(updateProfile.mock.invocationCallOrder[0]).toBeLessThan(
      remove.mock.invocationCallOrder[0],
    );
  });

  it('does not replace the profile when upload fails', async () => {
    upload.mockRejectedValue(new Error('Storage unavailable'));

    await expect(
      service.uploadMyAvatar('supabase-user-123', image),
    ).rejects.toThrow('Storage unavailable');

    expect(updateProfile).not.toHaveBeenCalled();
    expect(remove).not.toHaveBeenCalled();
  });

  it('cleans up the new file if database update fails', async () => {
    updateProfile.mockRejectedValue(new Error('Database unavailable'));

    await expect(
      service.uploadMyAvatar('supabase-user-123', image),
    ).rejects.toThrow(InternalServerErrorException);

    expect(remove).toHaveBeenCalledWith(upload.mock.calls[0][0]);
  });

  it('keeps the new avatar when old-file cleanup fails', async () => {
    findProfile.mockResolvedValue({
      avatarKey: 'user-123/old.webp',
    });

    remove.mockRejectedValue(new Error('Cleanup failed'));

    const result = await service.uploadMyAvatar('supabase-user-123', image);

    expect(result.avatarKey).not.toBe('user-123/old.webp');
  });

  it('removes the avatar from the authenticated profile', async () => {
    findProfile.mockResolvedValue({
      avatarKey: 'user-123/current.webp',
    });

    const result = await service.removeMyAvatar('supabase-user-123');

    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          userId: 'user-123',
        },
        data: {
          avatarKey: null,
        },
      }),
    );

    expect(remove).toHaveBeenCalledWith('user-123/current.webp');

    expect(result.avatarUrl).toBeNull();
  });

  it('allows removing an avatar when none exists', async () => {
    const result = await service.removeMyAvatar('supabase-user-123');

    expect(result.avatarKey).toBeNull();
    expect(remove).not.toHaveBeenCalled();
  });

  it('rejects avatar uploads for unknown accounts', async () => {
    findAccount.mockResolvedValue(null);

    await expect(
      service.uploadMyAvatar('unknown-account', image),
    ).rejects.toThrow(NotFoundException);

    expect(upload).not.toHaveBeenCalled();
  });

  it('rejects avatar removal for unknown accounts', async () => {
    findAccount.mockResolvedValue(null);

    await expect(service.removeMyAvatar('unknown-account')).rejects.toThrow(
      NotFoundException,
    );

    expect(updateProfile).not.toHaveBeenCalled();
  });
});
