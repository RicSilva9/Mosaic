import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { PrismaService } from '../prisma/prisma.service.js';

import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { ProfilesModule } from './profiles.module.js';
import { ProfilesService } from './profiles.service.js';

describe('Profiles HTTP', () => {
  let app: INestApplication;

  const findByUsername = vi.fn();

  const publicProfile = {
    username: 'teste',
    displayName: 'teste1',
    bio: null,
    avatarKey: null,
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ProfilesModule],
    })
      .overrideProvider(ProfilesService)
      .useValue({ findByUsername })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    findByUsername.mockReset();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('returns a public profile without authentication', async () => {
    findByUsername.mockResolvedValueOnce(publicProfile);

    const response = await request(app.getHttpServer())
      .get('/profiles/teste')
      .expect(200);

    expect(response.body).toEqual(publicProfile);
    expect(findByUsername).toHaveBeenCalledWith('teste');
  });

  it('passes uppercase usernames to the service', async () => {
    findByUsername.mockResolvedValueOnce(publicProfile);

    const response = await request(app.getHttpServer())
      .get('/profiles/TESTE')
      .expect(200);

    expect(response.body).toEqual(publicProfile);
    expect(findByUsername).toHaveBeenCalledWith('TESTE');
  });

  it('returns 404 when the profile does not exist', async () => {
    findByUsername.mockRejectedValueOnce(
      new NotFoundException('Profile not found'),
    );

    const response = await request(app.getHttpServer())
      .get('/profiles/usuario_inexistente')
      .expect(404);

    expect(response.body).toMatchObject({
      statusCode: 404,
      message: 'Profile not found',
    });
  });

  it('returns only the public profile response', async () => {
    findByUsername.mockResolvedValueOnce(publicProfile);

    const response = await request(app.getHttpServer())
      .get('/profiles/teste')
      .expect(200);

    expect(Object.keys(response.body).sort()).toEqual(
      ['username', 'displayName', 'bio', 'avatarKey'].sort(),
    );

    expect(response.body).not.toHaveProperty('email');
    expect(response.body).not.toHaveProperty('userId');
    expect(response.body).not.toHaveProperty('authProviderId');
  });
});
