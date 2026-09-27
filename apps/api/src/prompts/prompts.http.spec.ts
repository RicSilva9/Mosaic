import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthService } from '../auth/auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PromptsModule } from './prompts.module.js';
import { PromptsService } from './prompts.service.js';

describe('Prompts HTTP - create draft', () => {
  let app: INestApplication;

  const verifyAccessToken = vi.fn();
  const createDraft = vi.fn();

  const validDraft = {
    title: 'Cinematic landscape',
    description: 'A landscape video prompt',
    content: 'Generate a cinematic landscape.',
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    verifyAccessToken.mockResolvedValue({
      providerId: 'supabase-user-123',
      email: 'user@example.com',
    });

    createDraft.mockResolvedValue({
      id: 'prompt-123',
      ...validDraft,
      status: 'DRAFT',
      createdAt: '2026-09-27T12:00:00.000Z',
      updatedAt: '2026-09-27T12:00:00.000Z',
    });

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
        createDraft,
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

  function authenticatedRequest(body: Record<string, unknown>) {
    return request(app.getHttpServer())
      .post('/prompts')
      .set('Authorization', 'Bearer valid-token')
      .send(body);
  }

  it('requires authentication', async () => {
    await request(app.getHttpServer())
      .post('/prompts')
      .send(validDraft)
      .expect(401);

    expect(createDraft).not.toHaveBeenCalled();
  });

  it('creates a draft for the authenticated user', async () => {
    const response = await authenticatedRequest(validDraft).expect(201);

    expect(verifyAccessToken).toHaveBeenCalledWith('valid-token');

    expect(createDraft).toHaveBeenCalledWith('supabase-user-123', validDraft);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 'prompt-123',
        status: 'DRAFT',
      }),
    );
  });

  it('accepts a draft without a description', async () => {
    const draft = {
      title: 'Cinematic landscape',
      content: 'Generate a cinematic landscape.',
    };

    await authenticatedRequest(draft).expect(201);

    expect(createDraft).toHaveBeenCalledWith('supabase-user-123', draft);
  });

  it('rejects a missing title', async () => {
    await authenticatedRequest({
      content: validDraft.content,
    }).expect(400);

    expect(createDraft).not.toHaveBeenCalled();
  });

  it('rejects a blank title', async () => {
    await authenticatedRequest({
      ...validDraft,
      title: '   ',
    }).expect(400);

    expect(createDraft).not.toHaveBeenCalled();
  });

  it('rejects titles longer than 120 characters', async () => {
    await authenticatedRequest({
      ...validDraft,
      title: 'a'.repeat(121),
    }).expect(400);

    expect(createDraft).not.toHaveBeenCalled();
  });

  it('rejects missing prompt content', async () => {
    await authenticatedRequest({
      title: validDraft.title,
    }).expect(400);

    expect(createDraft).not.toHaveBeenCalled();
  });

  it('rejects blank prompt content', async () => {
    await authenticatedRequest({
      ...validDraft,
      content: '   ',
    }).expect(400);

    expect(createDraft).not.toHaveBeenCalled();
  });

  it('rejects descriptions longer than 1000 characters', async () => {
    await authenticatedRequest({
      ...validDraft,
      description: 'a'.repeat(1001),
    }).expect(400);

    expect(createDraft).not.toHaveBeenCalled();
  });

  it('rejects attempts to set protected fields', async () => {
    await authenticatedRequest({
      ...validDraft,
      authorId: 'another-user',
      status: 'PUBLISHED',
    }).expect(400);

    expect(createDraft).not.toHaveBeenCalled();
  });

  it('rejects invalid authentication tokens', async () => {
    verifyAccessToken.mockRejectedValue(
      new UnauthorizedException('Invalid token'),
    );

    await request(app.getHttpServer())
      .post('/prompts')
      .set('Authorization', 'Bearer invalid-token')
      .send(validDraft)
      .expect(401);

    expect(createDraft).not.toHaveBeenCalled();
  });
});
