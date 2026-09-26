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

import {
  type INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';

import { Test } from '@nestjs/testing';
import request from 'supertest';

import { IdentityController } from './identity.controller.js';
import { IdentityService } from './identity.service.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';

describe('Identity registration validation', () => {
  let app: INestApplication;

  const createIdentity = vi.fn();
  const getIdentity = vi.fn();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [IdentityController],
      providers: [
        {
          provide: IdentityService,
          useValue: {
            createIdentity,
            getIdentity,
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context: {
          switchToHttp: () => {
            getRequest: () => {
              user: {
                providerId: string;
                email: string;
              };
            };
          };
        }) => {
          const httpRequest = context.switchToHttp().getRequest();

          httpRequest.user = {
            providerId: 'verified-test-user',
            email: 'test@example.com',
          };

          return true;
        },
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

  beforeEach(() => {
    createIdentity.mockReset();

    createIdentity.mockResolvedValue({
      id: 'internal-user-id',
    });
    getIdentity.mockReset();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('accepts valid registration data', async () => {
    await request(app.getHttpServer())
      .post('/identity/register')
      .send({
        username: 'ricardo_dev',
        displayName: 'Ricardo',
      })
      .expect(201);

    expect(createIdentity).toHaveBeenCalledWith({
      authProvider: 'supabase',
      authProviderId: 'verified-test-user',
      email: 'test@example.com',
      username: 'ricardo_dev',
      displayName: 'Ricardo',
    });
  });

  it('rejects a username shorter than 3 characters', async () => {
    await request(app.getHttpServer())
      .post('/identity/register')
      .send({
        username: 'ab',
        displayName: 'Ricardo',
      })
      .expect(400);

    expect(createIdentity).not.toHaveBeenCalled();
  });

  it('rejects a username containing invalid characters', async () => {
    await request(app.getHttpServer())
      .post('/identity/register')
      .send({
        username: 'ricardo!',
        displayName: 'Ricardo',
      })
      .expect(400);

    expect(createIdentity).not.toHaveBeenCalled();
  });

  it('rejects a blank display name', async () => {
    await request(app.getHttpServer())
      .post('/identity/register')
      .send({
        username: 'ricardo_dev',
        displayName: '   ',
      })
      .expect(400);

    expect(createIdentity).not.toHaveBeenCalled();
  });

  it('rejects additional unauthorized fields', async () => {
    await request(app.getHttpServer())
      .post('/identity/register')
      .send({
        username: 'ricardo_dev',
        displayName: 'Ricardo',
        authProviderId: 'forged-user-id',
      })
      .expect(400);

    expect(createIdentity).not.toHaveBeenCalled();
  });

  it('rejects missing required fields', async () => {
    await request(app.getHttpServer())
      .post('/identity/register')
      .send({})
      .expect(400);

    expect(createIdentity).not.toHaveBeenCalled();
  });

  it('returns only the public registration fields', async () => {
    createIdentity.mockResolvedValueOnce({
      id: 'internal-user-id',
      profile: {
        username: 'ricardo_dev',
        displayName: 'Ricardo',
      },
      account: {
        authProviderId: 'private-provider-id',
        email: 'private@example.com',
      },
    });

    const response = await request(app.getHttpServer())
      .post('/identity/register')
      .send({
        username: 'ricardo_dev',
        displayName: 'Ricardo',
      })
      .expect(201);

    expect(response.body).toEqual({
      id: 'internal-user-id',
      profile: {
        username: 'ricardo_dev',
        displayName: 'Ricardo',
      },
    });

    expect(response.body).not.toHaveProperty('account');
    expect(response.body).not.toHaveProperty('email');
  });

  it('returns the authenticated user public profile', async () => {
    getIdentity.mockResolvedValueOnce({
      id: 'internal-user-id',
      profile: {
        username: 'ricardo',
        displayName: 'Ricardo Silva',
      },
    });

    const response = await request(app.getHttpServer())
      .get('/identity/me')
      .expect(200);

    expect(getIdentity).toHaveBeenCalledExactlyOnceWith(
      'supabase',
      'verified-test-user',
    );

    expect(response.body).toEqual({
      id: 'internal-user-id',
      profile: {
        username: 'ricardo',
        displayName: 'Ricardo Silva',
      },
    });
  });

  it('returns 404 when the authenticated user has no profile', async () => {
    getIdentity.mockRejectedValueOnce(
      new NotFoundException('Mosaic profile not found'),
    );

    const response = await request(app.getHttpServer())
      .get('/identity/me')
      .expect(404);

    expect(response.body).toMatchObject({
      statusCode: 404,
      message: 'Mosaic profile not found',
    });

    expect(getIdentity).toHaveBeenCalledExactlyOnceWith(
      'supabase',
      'verified-test-user',
    );
  });
});
