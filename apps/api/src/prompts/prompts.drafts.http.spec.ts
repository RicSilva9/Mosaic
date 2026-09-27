import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthService } from '../auth/auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PromptsModule } from './prompts.module.js';
import { PromptsService } from './prompts.service.js';

describe('Prompts HTTP - list my drafts', () => {
  let app: INestApplication;

  const verifyAccessToken = vi.fn();
  const findMyDrafts = vi.fn();

  const drafts = [
    {
      id: 'draft-123',
      title: 'Cinematic landscape',
      description: null,
      content: 'Generate a cinematic landscape.',
      status: 'DRAFT',
      createdAt: '2026-09-27T12:00:00.000Z',
      updatedAt: '2026-09-27T12:00:00.000Z',
    },
  ];

  beforeEach(async () => {
    vi.resetAllMocks();

    verifyAccessToken.mockResolvedValue({
      providerId: 'supabase-user-123',
      email: 'user@example.com',
    });

    findMyDrafts.mockResolvedValue(drafts);

    const module = await Test.createTestingModule({
      imports: [PromptsModule],
    })
      .overrideProvider(AuthService)
      .useValue({
        verifyAccessToken,
      })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(PromptsService)
      .useValue({
        createDraft: vi.fn(),
        findMyDrafts,
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

  it('rejects unauthenticated requests', async () => {
    await request(app.getHttpServer()).get('/prompts/me/drafts').expect(401);

    expect(findMyDrafts).not.toHaveBeenCalled();
  });

  it('returns the authenticated user drafts', async () => {
    const response = await request(app.getHttpServer())
      .get('/prompts/me/drafts')
      .set('Authorization', 'Bearer valid-token')
      .expect(200);

    expect(verifyAccessToken).toHaveBeenCalledWith('valid-token');

    expect(findMyDrafts).toHaveBeenCalledWith('supabase-user-123');

    expect(response.body).toEqual(drafts);
  });

  it('returns an empty array when no drafts exist', async () => {
    findMyDrafts.mockResolvedValue([]);

    const response = await request(app.getHttpServer())
      .get('/prompts/me/drafts')
      .set('Authorization', 'Bearer valid-token')
      .expect(200);

    expect(response.body).toEqual([]);
  });

  it('rejects invalid authentication tokens', async () => {
    verifyAccessToken.mockRejectedValue(
      new UnauthorizedException('Invalid token'),
    );

    await request(app.getHttpServer())
      .get('/prompts/me/drafts')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);

    expect(findMyDrafts).not.toHaveBeenCalled();
  });

  it('uses the provider ID from the verified token', async () => {
    verifyAccessToken.mockResolvedValue({
      providerId: 'another-provider-id',
      email: 'another@example.com',
    });

    await request(app.getHttpServer())
      .get('/prompts/me/drafts')
      .set('Authorization', 'Bearer another-token')
      .expect(200);

    expect(findMyDrafts).toHaveBeenCalledWith('another-provider-id');
  });
});
