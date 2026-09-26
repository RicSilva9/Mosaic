import { BadRequestException, PayloadTooLargeException } from '@nestjs/common';
import sharp from 'sharp';
import { beforeAll, describe, expect, it } from 'vitest';

import {
  MAX_AVATAR_SIZE,
  MAX_AVATAR_DIMENSION,
  validateAvatar,
} from './avatar.validator.js';

describe('validateAvatar', () => {
  const userId = 'user-123';

  let jpeg: Buffer;
  let png: Buffer;
  let webp: Buffer;

  beforeAll(async () => {
    const image = sharp({
      create: {
        width: 20,
        height: 20,
        channels: 3,
        background: '#663399',
      },
    });

    jpeg = await image.clone().jpeg().toBuffer();
    png = await image.clone().png().toBuffer();
    webp = await image.clone().webp().toBuffer();
  });

  it.each([
    ['JPEG', 'jpeg'],
    ['PNG', 'png'],
    ['WebP', 'webp'],
  ])('accepts valid %s images', async (_, format) => {
    const buffers: Record<string, Buffer> = {
      jpeg,
      png,
      webp,
    };

    const result = await validateAvatar(buffers[format], userId);

    expect(result.contentType).toBe('image/webp');

    expect(result.key).toMatch(/^user-123\/[a-f0-9-]+\.webp$/);

    const metadata = await sharp(result.buffer).metadata();

    expect(metadata.format).toBe('webp');
  });

  it('rejects empty files', async () => {
    await expect(validateAvatar(Buffer.alloc(0), userId)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('rejects unsupported files', async () => {
    await expect(
      validateAvatar(Buffer.from('not an image'), userId),
    ).rejects.toThrow(BadRequestException);
  });

  it('rejects incomplete image files', async () => {
    await expect(validateAvatar(jpeg.subarray(0, 4), userId)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('rejects files larger than 2 MB', async () => {
    const oversized = Buffer.concat([jpeg, Buffer.alloc(MAX_AVATAR_SIZE)]);

    await expect(validateAvatar(oversized, userId)).rejects.toThrow(
      PayloadTooLargeException,
    );
  });

  it('generates a different key for each upload', async () => {
    const first = await validateAvatar(jpeg, userId);

    const second = await validateAvatar(jpeg, userId);

    expect(first.key).not.toBe(second.key);
  });

  it('includes the user ID in the storage key', async () => {
    const result = await validateAvatar(jpeg, userId);

    expect(result.key.startsWith(`${userId}/`)).toBe(true);
  });

  it('limits the dimensions of large images', async () => {
    const largeImage = await sharp({
      create: {
        width: 1200,
        height: 800,
        channels: 3,
        background: '#663399',
      },
    })
      .jpeg()
      .toBuffer();

    const result = await validateAvatar(largeImage, userId);

    const metadata = await sharp(result.buffer).metadata();

    expect(metadata.width).toBeLessThanOrEqual(MAX_AVATAR_DIMENSION);

    expect(metadata.height).toBeLessThanOrEqual(MAX_AVATAR_DIMENSION);
  });

  it('rejects unsupported image signatures', async () => {
    const gif = await sharp({
      create: {
        width: 20,
        height: 20,
        channels: 3,
        background: '#663399',
      },
    })
      .gif()
      .toBuffer();

    await expect(validateAvatar(gif, userId)).rejects.toThrow(
      BadRequestException,
    );
  });
});
