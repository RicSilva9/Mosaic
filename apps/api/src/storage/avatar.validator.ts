import { BadRequestException, PayloadTooLargeException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';

export const MAX_AVATAR_SIZE = 2 * 1024 * 1024;
export const MAX_AVATAR_DIMENSION = 512;

export interface ValidatedAvatar {
  buffer: Buffer;
  contentType: 'image/webp';
  key: string;
}

function detectImageType(buffer: Buffer): boolean {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return true;
  }

  if (
    buffer.length >= 8 &&
    buffer
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return true;
  }

  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return true;
  }

  return false;
}

export async function validateAvatar(
  buffer: Buffer,
  userId: string,
): Promise<ValidatedAvatar> {
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
    throw new BadRequestException('Avatar file is required');
  }

  if (buffer.length > MAX_AVATAR_SIZE) {
    throw new PayloadTooLargeException('Avatar must not exceed 2 MB');
  }

  if (!detectImageType(buffer)) {
    throw new BadRequestException('Avatar must be a JPEG, PNG or WebP image');
  }

  try {
    const image = sharp(buffer, {
      limitInputPixels: 25_000_000,
      failOn: 'error',
    });

    const metadata = await image.metadata();

    if (
      !['jpeg', 'png', 'webp'].includes(metadata.format ?? '') ||
      !metadata.width ||
      !metadata.height
    ) {
      throw new BadRequestException('Invalid avatar image');
    }

    const processedBuffer = await image
      .rotate()
      .resize(MAX_AVATAR_DIMENSION, MAX_AVATAR_DIMENSION, {
        fit: 'cover',
        position: 'centre',
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
        effort: 4,
      })
      .toBuffer();

    return {
      buffer: processedBuffer,
      contentType: 'image/webp',
      key: `${userId}/${randomUUID()}.webp`,
    };
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw error;
    }

    throw new BadRequestException('The uploaded file is not a valid image');
  }
}
