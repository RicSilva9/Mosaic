import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthService } from '../auth/auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProfilesModule } from './profiles.module.js';
import { ProfilesService } from './profiles.service.js';

describe('Profiles update HTTP', () => {
  let app: INestApplication;

  const verifyAccessToken = vi.fn();
  const updateMyProfile = vi.fn();

  beforeEach(async () => {
    vi.clearAllMocks();

    verifyAccessToken.mockResolvedValue({
      providerId: 'supabase-user-123',
      email: 'user@example.com',
    });

    updateMyProfile.mockResolvedValue({
      username: 'ricardo',
      displayName: 'Ricardo Silva',
      bio: 'Frontend developer',
      avatarKey: null,
    });

    const module = await Test.createTestingModule({
      imports: [ProfilesModule],
    })
      .overrideProvider(AuthService)
      .useValue({
        verifyAccessToken,
      })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(ProfilesService)
      .useValue({
        updateMyProfile,
        findByUsername: vi.fn(),
      })
      .compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterEach(async () => {
    await app?.close();
  });

  it('rejects requests without authentication', async () => {
    await request(app.getHttpServer())
      .patch('/profiles/me')
      .send({
        displayName: 'Ricardo Silva',
      })
      .expect(401);

    expect(updateMyProfile).not.toHaveBeenCalled();
  });

  it('updates the authenticated user profile', async () => {
    const response = await request(app.getHttpServer())
      .patch('/profiles/me')
      .set('Authorization', 'Bearer valid-token')
      .send({
        displayName: 'Ricardo Silva',
        bio: 'Frontend developer',
      })
      .expect(200);

    expect(verifyAccessToken).toHaveBeenCalledWith('valid-token');

    expect(updateMyProfile).toHaveBeenCalledWith('supabase-user-123', {
      displayName: 'Ricardo Silva',
      bio: 'Frontend developer',
    });

    expect(response.body).toEqual({
      username: 'ricardo',
      displayName: 'Ricardo Silva',
      bio: 'Frontend developer',
      avatarKey: null,
    });
  });

  it('rejects a blank display name', async () => {
    await request(app.getHttpServer())
      .patch('/profiles/me')
      .set('Authorization', 'Bearer valid-token')
      .send({
        displayName: '   ',
      })
      .expect(400);

    expect(updateMyProfile).not.toHaveBeenCalled();
  });

  it('rejects biographies longer than 500 characters', async () => {
    await request(app.getHttpServer())
      .patch('/profiles/me')
      .set('Authorization', 'Bearer valid-token')
      .send({
        bio: 'a'.repeat(501),
      })
      .expect(400);

    expect(updateMyProfile).not.toHaveBeenCalled();
  });

  it('rejects attempts to modify protected fields', async () => {
    await request(app.getHttpServer())
      .patch('/profiles/me')
      .set('Authorization', 'Bearer valid-token')
      .send({
        username: 'another_user',
      })
      .expect(400);

    expect(updateMyProfile).not.toHaveBeenCalled();
  });

  it('rejects invalid authentication tokens', async () => {
    verifyAccessToken.mockRejectedValue(
      new UnauthorizedException('Invalid token'),
    );

    await request(app.getHttpServer())
      .patch('/profiles/me')
      .set('Authorization', 'Bearer invalid-token')
      .send({
        bio: 'Updated biography',
      })
      .expect(401);

    expect(updateMyProfile).not.toHaveBeenCalled();
  });
});
