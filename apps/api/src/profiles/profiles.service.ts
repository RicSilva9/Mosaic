import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string) {
    const normalizedUsername = username.trim().toLowerCase();

    const profile = await this.prisma.profile.findUnique({
      where: {
        normalizedUsername,
      },
      select: {
        username: true,
        displayName: true,
        bio: true,
        avatarKey: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return {
      username: profile.username,
      displayName: profile.displayName,
      bio: profile.bio,
      avatarKey: profile.avatarKey,
    };
  }
}
