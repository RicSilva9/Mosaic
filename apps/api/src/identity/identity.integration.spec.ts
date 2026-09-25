import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { ConflictException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { IdentityService } from './identity.service.js';

describe('IdentityService - PostgreSQL integration', () => {
  let prisma: PrismaService;
  let identity: IdentityService;

  const createdUserIds: string[] = [];

  beforeAll(async () => {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is required');
    }

    const url = new URL(databaseUrl);

    if (
      url.pathname !== '/mosaic_test' ||
      !['127.0.0.1', 'localhost'].includes(url.hostname)
    ) {
      throw new Error(
        'Integration tests must use the local mosaic_test database',
      );
    }

    prisma = new PrismaService();
    identity = new IdentityService(prisma);

    await prisma.$connect();
  });

  afterAll(async () => {
    if (!prisma) return;

    for (const userId of createdUserIds) {
      await prisma.$transaction(async (tx) => {
        await tx.account.deleteMany({
          where: { userId },
        });

        await tx.profile.deleteMany({
          where: { userId },
        });

        await tx.user.deleteMany({
          where: { id: userId },
        });
      });
    }

    await prisma.$disconnect();
  });

  it('creates User, Account and Profile', async () => {
    const uniqueId = randomUUID().replaceAll('-', '');

    const result = await identity.createIdentity({
      authProvider: 'integration-test',
      authProviderId: uniqueId,
      email: `${uniqueId}@example.com`,
      username: `test_${uniqueId}`,
      displayName: 'Integration Test',
    });

    createdUserIds.push(result.id);

    const user = await prisma.user.findUnique({
      where: { id: result.id },
      include: {
        account: true,
        profile: true,
      },
    });

    expect(user).not.toBeNull();
    expect(user?.account?.authProviderId).toBe(uniqueId);
    expect(user?.profile?.normalizedUsername).toBe(`test_${uniqueId}`);
  });

  it('rejects duplicate usernames without creating another user', async () => {
    const uniqueId = randomUUID().replaceAll('-', '');
    const username = `test_${uniqueId}`;

    const first = await identity.createIdentity({
      authProvider: 'integration-test',
      authProviderId: `${uniqueId}_first`,
      username,
      displayName: 'First User',
    });

    createdUserIds.push(first.id);

    const countBefore = await prisma.user.count();

    await expect(
      identity.createIdentity({
        authProvider: 'integration-test',
        authProviderId: `${uniqueId}_second`,
        username: username.toUpperCase(),
        displayName: 'Second User',
      }),
    ).rejects.toThrow(ConflictException);

    expect(await prisma.user.count()).toBe(countBefore);
  });

  it('rejects an already registered authentication account', async () => {
    const uniqueId = randomUUID().replaceAll('-', '');

    const first = await identity.createIdentity({
      authProvider: 'integration-test',
      authProviderId: uniqueId,
      username: `first_${uniqueId}`,
      displayName: 'First User',
    });

    createdUserIds.push(first.id);

    const usersBefore = await prisma.user.count();
    const accountsBefore = await prisma.account.count();
    const profilesBefore = await prisma.profile.count();

    await expect(
      identity.createIdentity({
        authProvider: 'integration-test',
        authProviderId: uniqueId,
        username: `second_${uniqueId}`,
        displayName: 'Second User',
      }),
    ).rejects.toThrow('This authentication account is already registered');

    expect(await prisma.user.count()).toBe(usersBefore);
    expect(await prisma.account.count()).toBe(accountsBefore);
    expect(await prisma.profile.count()).toBe(profilesBefore);
  });

  it('rejects duplicate normalized emails without creating another user', async () => {
    const uniqueId = randomUUID().replaceAll('-', '');
    const email = `${uniqueId}@example.com`;

    const first = await identity.createIdentity({
      authProvider: 'integration-test',
      authProviderId: `${uniqueId}_first`,
      email,
      username: `first_${uniqueId}`,
      displayName: 'First User',
    });

    createdUserIds.push(first.id);

    const usersBefore = await prisma.user.count();
    const accountsBefore = await prisma.account.count();
    const profilesBefore = await prisma.profile.count();

    await expect(
      identity.createIdentity({
        authProvider: 'integration-test',
        authProviderId: `${uniqueId}_second`,
        email: email.toUpperCase(),
        username: `second_${uniqueId}`,
        displayName: 'Second User',
      }),
    ).rejects.toThrow(ConflictException);

    expect(await prisma.user.count()).toBe(usersBefore);
    expect(await prisma.account.count()).toBe(accountsBefore);
    expect(await prisma.profile.count()).toBe(profilesBefore);
  });

  it('rolls back the transaction when profile creation fails', async () => {
    const uniqueId = randomUUID().replaceAll('-', '');

    const usersBefore = await prisma.user.count();
    const accountsBefore = await prisma.account.count();
    const profilesBefore = await prisma.profile.count();

    const transactionSpy = vi.spyOn(prisma, '$transaction');

    try {
      await expect(
        prisma.$transaction(async (tx) => {
          await tx.user.create({
            data: {
              account: {
                create: {
                  authProvider: 'integration-test',
                  authProviderId: uniqueId,
                },
              },
            },
          });

          throw new Error('Simulated profile creation failure');
        }),
      ).rejects.toThrow('Simulated profile creation failure');
    } finally {
      transactionSpy.mockRestore();
    }

    expect(await prisma.user.count()).toBe(usersBefore);
    expect(await prisma.account.count()).toBe(accountsBefore);
    expect(await prisma.profile.count()).toBe(profilesBefore);
  });
});
