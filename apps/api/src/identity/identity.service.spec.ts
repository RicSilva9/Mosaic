import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConflictException } from '@nestjs/common';
import { IdentityService } from './identity.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('IdentityService', () => {
  const findUnique = vi.fn();
  const create = vi.fn();
  const transaction = vi.fn();

  let service: IdentityService;

  beforeEach(() => {
    vi.resetAllMocks();

    transaction.mockImplementation(async (callback) =>
      callback({
        user: { create },
      }),
    );

    const prisma = {
      profile: { findUnique },
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
    findUnique.mockResolvedValue(null);

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
    findUnique.mockResolvedValue({
      id: 'existing-profile',
    });

    await expect(service.createIdentity(input)).rejects.toThrow(
      ConflictException,
    );

    expect(transaction).not.toHaveBeenCalled();
  });

  it('propagates transaction failures', async () => {
    findUnique.mockResolvedValue(null);

    create.mockRejectedValue(new Error('Database operation failed'));

    await expect(service.createIdentity(input)).rejects.toThrow(
      'Database operation failed',
    );

    expect(transaction).toHaveBeenCalledOnce();
  });
});
