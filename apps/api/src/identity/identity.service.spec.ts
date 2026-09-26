import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { IdentityService } from './identity.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

describe('IdentityService', () => {
  const findAccount = vi.fn();
  const findProfile = vi.fn();
  const create = vi.fn();
  const transaction = vi.fn();

  let service: IdentityService;

  beforeEach(() => {
    vi.resetAllMocks();

    // Por padrão, não existem contas ou perfis duplicados.
    findAccount.mockResolvedValue(null);
    findProfile.mockResolvedValue(null);

    transaction.mockImplementation(async (callback) =>
      callback({
        user: { create },
      }),
    );

    const prisma = {
      account: {
        findUnique: findAccount,
      },
      profile: {
        findUnique: findProfile,
      },
      $transaction: transaction,
    } as unknown as PrismaService;

    service = new IdentityService(prisma);
  });

  const input = {
    authProvider: 'supabase',
    authProviderId: 'external-user-id',
    email: 'Ricardo@Example.com',
    username: 'Ricardo',
    displayName: 'Ricardo Silva',
  };

  it('creates an identity in a transaction', async () => {
    const createdUser = {
      id: 'user-id',
      profile: {
        username: 'Ricardo',
      },
    };

    create.mockResolvedValue(createdUser);

    const result = await service.createIdentity(input);

    expect(result).toEqual(createdUser);
    expect(transaction).toHaveBeenCalledOnce();

    expect(create).toHaveBeenCalledWith({
      data: {
        account: {
          create: {
            authProvider: 'supabase',
            authProviderId: 'external-user-id',
            email: 'Ricardo@Example.com',
            normalizedEmail: 'ricardo@example.com',
          },
        },
        profile: {
          create: {
            username: 'Ricardo',
            normalizedUsername: 'ricardo',
            displayName: 'Ricardo Silva',
          },
        },
      },
      include: {
        profile: true,
      },
    });
  });

  it('rejects duplicate usernames', async () => {
    findProfile.mockResolvedValue({
      id: 'existing-profile',
    });

    await expect(service.createIdentity(input)).rejects.toThrow(
      ConflictException,
    );

    expect(transaction).not.toHaveBeenCalled();
  });

  it('propagates transaction failures', async () => {
    create.mockRejectedValue(new Error('Database operation failed'));

    await expect(service.createIdentity(input)).rejects.toThrow(
      'Database operation failed',
    );

    expect(transaction).toHaveBeenCalledOnce();
  });

  it('converts Prisma unique constraint errors into conflicts', async () => {
    create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: '7.10.0',
      }),
    );

    await expect(service.createIdentity(input)).rejects.toThrow(
      ConflictException,
    );

    expect(transaction).toHaveBeenCalledOnce();
  });

  it('rejects an authentication account that is already registered', async () => {
    findAccount.mockResolvedValue({
      id: 'existing-account',
      authProvider: 'supabase',
      authProviderId: 'external-user-id',
    });

    await expect(service.createIdentity(input)).rejects.toThrow(
      'This authentication account is already registered',
    );

    expect(findProfile).not.toHaveBeenCalled();
    expect(transaction).not.toHaveBeenCalled();
  });

  it('checks the authentication provider and provider ID', async () => {
    create.mockResolvedValue({
      id: 'user-id',
    });

    await service.createIdentity(input);

    expect(findAccount).toHaveBeenCalledExactlyOnceWith({
      where: {
        authProvider_authProviderId: {
          authProvider: 'supabase',
          authProviderId: 'external-user-id',
        },
      },
    });

    expect(findProfile).toHaveBeenCalledOnce();
  });

  it('returns the profile associated with an authenticated account', async () => {
    findAccount.mockResolvedValue({
      user: {
        id: 'internal-user-id',
        profile: {
          username: 'ricardo',
          displayName: 'Ricardo Silva',
        },
      },
    });

    const result = await service.getIdentity('supabase', 'external-user-id');

    expect(findAccount).toHaveBeenCalledWith({
      where: {
        authProvider_authProviderId: {
          authProvider: 'supabase',
          authProviderId: 'external-user-id',
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    expect(result).toEqual({
      id: 'internal-user-id',
      profile: {
        username: 'ricardo',
        displayName: 'Ricardo Silva',
      },
    });
  });

  it('returns 404 when the authenticated account has no Mosaic identity', async () => {
    findAccount.mockResolvedValue(null);

    await expect(
      service.getIdentity('supabase', 'unknown-user'),
    ).rejects.toThrow(NotFoundException);
  });
});
