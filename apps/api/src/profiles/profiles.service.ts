import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

interface UpdateProfileInput {
  displayName?: string;
  bio?: string;
}

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

  async updateMyProfile(authProviderId: string, input: UpdateProfileInput) {
    const account = await this.prisma.account.findUnique({
      where: {
        authProvider_authProviderId: {
          authProvider: 'supabase',
          authProviderId,
        },
      },
      select: {
        userId: true,
      },
    });

    if (!account) {
      throw new NotFoundException('Mosaic profile not found');
    }

    const data: UpdateProfileInput = {};

    if (input.displayName !== undefined) {
      data.displayName = input.displayName.trim();
    }

    if (input.bio !== undefined) {
      data.bio = input.bio.trim();
    }

    const profile = await this.prisma.profile.update({
      where: {
        userId: account.userId,
      },
      data,
      select: {
        username: true,
        displayName: true,
        bio: true,
        avatarKey: true,
      },
    });

    return profile;
  }
}
