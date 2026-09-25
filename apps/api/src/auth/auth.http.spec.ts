import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AuthModule } from './auth.module.js';
import { AuthService } from './auth.service.js';

describe('Auth HTTP', () => {
  let app: INestApplication;

  const verifyAccessToken = vi.fn();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue({ verifyAccessToken })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('rejects requests without an access token', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .expect(401);

    expect(response.body.message).toBe('Authorization header is missing');
    expect(verifyAccessToken).not.toHaveBeenCalled();
  });

  it('rejects requests with an invalid access token', async () => {
    verifyAccessToken.mockRejectedValueOnce(new Error('Invalid token'));

    // Simula a exceção HTTP produzida pelo AuthService.
    const { UnauthorizedException } = await import('@nestjs/common');

    verifyAccessToken.mockReset();
    verifyAccessToken.mockRejectedValueOnce(
      new UnauthorizedException('Invalid or expired access token'),
    );

    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);

    expect(verifyAccessToken).toHaveBeenCalledWith('invalid-token');
  });

  it('returns the authenticated user with a valid token', async () => {
    verifyAccessToken.mockResolvedValueOnce({
      providerId: 'test-user-id',
      email: 'test@example.com',
    });

    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', 'Bearer valid-token')
      .expect(200);

    expect(response.body).toEqual({
      user: {
        providerId: 'test-user-id',
        email: 'test@example.com',
      },
    });

    expect(verifyAccessToken).toHaveBeenCalledWith('valid-token');
  });
});
