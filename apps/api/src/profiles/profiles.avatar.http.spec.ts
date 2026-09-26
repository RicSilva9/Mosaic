import type { INestApplication } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import sharp from 'sharp';
import request from 'supertest';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { AuthService } from '../auth/auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import { ProfilesModule } from './profiles.module.js';
import { ProfilesService } from './profiles.service.js';

describe('Profiles avatar HTTP', () => {
  let app: INestApplication;
  let image: Buffer;

  const verifyAccessToken = vi.fn();
  const uploadMyAvatar = vi.fn();
  const removeMyAvatar = vi.fn();

  const profile = {
    username: 'ricardo',
    displayName: 'Ricardo',
    bio: null,
    avatarKey: 'user-123/avatar.webp',
    avatarUrl: 'https://storage.example.com/avatar.webp',
  };

  beforeAll(async () => {
    image = await sharp({
      create: {
        width: 20,
        height: 20,
        channels: 3,
        background: '#663399',
      },
    })
      .jpeg()
      .toBuffer();

    const module = await Test.createTestingModule({
      imports: [ProfilesModule],
    })
      .overrideProvider(AuthService)
      .useValue({
        verifyAccessToken,
      })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(StorageService)
      .useValue({
        upload: vi.fn(),
        remove: vi.fn(),
        getPublicUrl: vi.fn(),
      })
      .overrideProvider(ProfilesService)
      .useValue({
        findByUsername: vi.fn(),
        updateMyProfile: vi.fn(),
        uploadMyAvatar,
        removeMyAvatar,
      })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    vi.clearAllMocks();

    verifyAccessToken.mockResolvedValue({
      providerId: 'supabase-user-123',
      email: 'user@example.com',
    });

    uploadMyAvatar.mockResolvedValue(profile);

    removeMyAvatar.mockResolvedValue({
      ...profile,
      avatarKey: null,
      avatarUrl: null,
    });
  });

  afterAll(async () => {
    await app?.close();
  });

  it('rejects uploads without authentication', async () => {
    await request(app.getHttpServer())
      .post('/profiles/me/avatar')
      .attach('avatar', image, 'avatar.jpg')
      .expect(401);

    expect(uploadMyAvatar).not.toHaveBeenCalled();
  });

  it('uploads an avatar for the authenticated user', async () => {
    const response = await request(app.getHttpServer())
      .post('/profiles/me/avatar')
      .set('Authorization', 'Bearer valid-token')
      .attach('avatar', image, 'avatar.jpg')
      .expect(201);

    expect(verifyAccessToken).toHaveBeenCalledWith('valid-token');

    expect(uploadMyAvatar).toHaveBeenCalledWith(
      'supabase-user-123',
      expect.any(Buffer),
    );

    expect(uploadMyAvatar.mock.calls[0][1]).toEqual(image);

    expect(response.body).toEqual(profile);
  });

  it('rejects uploads without a file', async () => {
    await request(app.getHttpServer())
      .post('/profiles/me/avatar')
      .set('Authorization', 'Bearer valid-token')
      .expect(400);

    expect(uploadMyAvatar).not.toHaveBeenCalled();
  });

  it('rejects files exceeding 2 MB', async () => {
    await request(app.getHttpServer())
      .post('/profiles/me/avatar')
      .set('Authorization', 'Bearer valid-token')
      .attach('avatar', Buffer.alloc(2 * 1024 * 1024 + 1, 0), 'large.jpg')
      .expect(413);

    expect(uploadMyAvatar).not.toHaveBeenCalled();
  });

  it('rejects invalid authentication tokens', async () => {
    verifyAccessToken.mockRejectedValue(
      new UnauthorizedException('Invalid token'),
    );

    await request(app.getHttpServer())
      .post('/profiles/me/avatar')
      .set('Authorization', 'Bearer invalid-token')
      .attach('avatar', image, 'avatar.jpg')
      .expect(401);

    expect(uploadMyAvatar).not.toHaveBeenCalled();
  });

  it('removes the authenticated user avatar', async () => {
    const response = await request(app.getHttpServer())
      .delete('/profiles/me/avatar')
      .set('Authorization', 'Bearer valid-token')
      .expect(200);

    expect(removeMyAvatar).toHaveBeenCalledWith('supabase-user-123');

    expect(response.body.avatarKey).toBeNull();
    expect(response.body.avatarUrl).toBeNull();
  });

  it('rejects removal without authentication', async () => {
    await request(app.getHttpServer())
      .delete('/profiles/me/avatar')
      .expect(401);

    expect(removeMyAvatar).not.toHaveBeenCalled();
  });

  it('propagates service validation errors', async () => {
    uploadMyAvatar.mockRejectedValue(
      new BadRequestException('Invalid avatar image'),
    );

    await request(app.getHttpServer())
      .post('/profiles/me/avatar')
      .set('Authorization', 'Bearer valid-token')
      .attach('avatar', image, 'avatar.jpg')
      .expect(400);
  });
});
