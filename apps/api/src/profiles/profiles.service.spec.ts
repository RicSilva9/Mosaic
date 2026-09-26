import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PrismaService } from '../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import { ProfilesService } from './profiles.service.js';

describe('ProfilesService', () => {
  const findUnique = vi.fn();
  const getPublicUrl = vi.fn();

  let service: ProfilesService;

  beforeEach(() => {
    vi.clearAllMocks();

    const prisma = {
      profile: {
        findUnique,
      },
    } as unknown as PrismaService;

    const storage = {
      getPublicUrl,
    } as unknown as StorageService;

    getPublicUrl.mockImplementation(
      (key: string) => `https://storage.example.com/avatars/${key}`,
    );

    service = new ProfilesService(prisma, storage);
  });

  it('returns the public profile fields', async () => {
    findUnique.mockResolvedValue({
      username: 'ricardo',
      displayName: 'Ricardo',
      bio: 'AI video creator',
      avatarKey: null,
    });

    await expect(service.findByUsername('ricardo')).resolves.toEqual({
      username: 'ricardo',
      displayName: 'Ricardo',
      bio: 'AI video creator',
      avatarKey: null,
      avatarUrl: null,
    });

    expect(findUnique).toHaveBeenCalledWith({
      where: {
        normalizedUsername: 'ricardo',
      },
      select: {
        username: true,
        displayName: true,
        bio: true,
        avatarKey: true,
      },
    });

    expect(getPublicUrl).not.toHaveBeenCalled();
  });

  it('normalizes the username before querying', async () => {
    findUnique.mockResolvedValue({
      username: 'ricardo',
      displayName: 'Ricardo',
      bio: null,
      avatarKey: null,
    });

    await service.findByUsername('  RICARDO  ');

    expect(findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          normalizedUsername: 'ricardo',
        },
      }),
    );
  });

  it('throws 404 when the profile does not exist', async () => {
    findUnique.mockResolvedValue(null);

    await expect(service.findByUsername('unknown')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('does not expose private fields', async () => {
    findUnique.mockResolvedValue({
      username: 'ricardo',
      displayName: 'Ricardo',
      bio: null,
      avatarKey: null,
    });

    const result = await service.findByUsername('ricardo');

    expect(result).not.toHaveProperty('email');
    expect(result).not.toHaveProperty('authProviderId');
    expect(result).not.toHaveProperty('userId');
    expect(result).not.toHaveProperty('normalizedUsername');
  });

  it('returns the public avatar URL when an avatar exists', async () => {
    findUnique.mockResolvedValue({
      username: 'ricardo',
      displayName: 'Ricardo',
      bio: null,
      avatarKey: 'user-123/avatar.webp',
    });

    const result = await service.findByUsername('ricardo');

    expect(getPublicUrl).toHaveBeenCalledWith('user-123/avatar.webp');

    expect(result.avatarUrl).toBe(
      'https://storage.example.com/avatars/user-123/avatar.webp',
    );
  });
});
