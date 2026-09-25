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

import { type INestApplication, ValidationPipe } from '@nestjs/common';

import { Test } from '@nestjs/testing';
import request from 'supertest';

import { IdentityController } from './identity.controller.js';
import { IdentityService } from './identity.service.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';

describe('Identity registration validation', () => {
  let app: INestApplication;

  const createIdentity = vi.fn();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [IdentityController],
      providers: [
        {
          provide: IdentityService,
          useValue: { createIdentity },
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
});
