import 'reflect-metadata';

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { type INestApplication, UnauthorizedException } from '@nestjs/common';

import { Test } from '@nestjs/testing';
import request from 'supertest';

import { IdentityController } from './identity.controller.js';
import { IdentityService } from './identity.service.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { AuthService } from '../auth/auth.service.js';

describe('Identity HTTP authentication', () => {
  let app: INestApplication;

  const verifyAccessToken = vi.fn();
  const getIdentity = vi.fn();
  const createIdentity = vi.fn();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [IdentityController],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: { verifyAccessToken },
        },
        {
          provide: IdentityService,
          useValue: {
            getIdentity,
            createIdentity,
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('rejects requests without an authorization header', async () => {
    const response = await request(app.getHttpServer())
      .get('/identity/me')
      .expect(401);

    expect(response.body).toMatchObject({
      statusCode: 401,
      message: 'Authorization header is missing',
    });

    expect(verifyAccessToken).not.toHaveBeenCalled();
    expect(getIdentity).not.toHaveBeenCalled();
  });

  it('rejects malformed authorization headers', async () => {
    await request(app.getHttpServer())
      .get('/identity/me')
      .set('Authorization', 'Basic invalid-token')
      .expect(401);

    expect(verifyAccessToken).not.toHaveBeenCalled();
    expect(getIdentity).not.toHaveBeenCalled();
  });

  it('rejects invalid access tokens', async () => {
    verifyAccessToken.mockRejectedValueOnce(
      new UnauthorizedException('Invalid access token'),
    );

    await request(app.getHttpServer())
      .get('/identity/me')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);

    expect(getIdentity).not.toHaveBeenCalled();
  });

  it('uses the verified token identity to retrieve the profile', async () => {
    verifyAccessToken.mockResolvedValueOnce({
      providerId: 'verified-user-id',
      email: 'user@example.com',
    });

    getIdentity.mockResolvedValueOnce({
      id: 'internal-user-id',
      profile: {
        username: 'ricardo',
        displayName: 'Ricardo Silva',
      },
    });

    const response = await request(app.getHttpServer())
      .get('/identity/me')
      .set('Authorization', 'Bearer valid-test-token')
      .expect(200);

    expect(verifyAccessToken).toHaveBeenCalledExactlyOnceWith(
      'valid-test-token',
    );

    expect(getIdentity).toHaveBeenCalledExactlyOnceWith(
      'supabase',
      'verified-user-id',
    );

    expect(response.body).toEqual({
      id: 'internal-user-id',
      profile: {
        username: 'ricardo',
        displayName: 'Ricardo Silva',
      },
    });
  });
});
