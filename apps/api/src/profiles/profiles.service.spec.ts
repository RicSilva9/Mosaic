import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProfilesService } from './profiles.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('ProfilesService', () => {
  const findUnique = vi.fn();

  let service: ProfilesService;

  beforeEach(() => {
    vi.clearAllMocks();

    const prisma = {
      profile: {
        findUnique,
      },
    } as unknown as PrismaService;

    service = new ProfilesService(prisma);
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
});
