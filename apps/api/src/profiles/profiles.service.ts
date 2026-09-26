import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import { validateAvatar } from '../storage/avatar.validator.js';

interface UpdateProfileInput {
  displayName?: string;
  bio?: string;
}

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  private async findAccount(authProviderId: string) {
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

    return account;
  }

  private formatProfile(profile: {
    username: string;
    displayName: string;
    bio: string | null;
    avatarKey: string | null;
  }) {
    return {
      ...profile,
      avatarUrl: profile.avatarKey
        ? this.storage.getPublicUrl(profile.avatarKey)
        : null,
    };
  }

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

    return this.formatProfile(profile);
  }

  async updateMyProfile(authProviderId: string, input: UpdateProfileInput) {
    const account = await this.findAccount(authProviderId);

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

    return this.formatProfile(profile);
  }

  async uploadMyAvatar(authProviderId: string, fileBuffer: Buffer) {
    const account = await this.findAccount(authProviderId);

    const currentProfile = await this.prisma.profile.findUnique({
      where: {
        userId: account.userId,
      },
      select: {
        avatarKey: true,
      },
    });

    if (!currentProfile) {
      throw new NotFoundException('Mosaic profile not found');
    }

    const avatar = await validateAvatar(fileBuffer, account.userId);

    await this.storage.upload(avatar.key, avatar.buffer, avatar.contentType);

    let updatedProfile;

    try {
      updatedProfile = await this.prisma.profile.update({
        where: {
          userId: account.userId,
        },
        data: {
          avatarKey: avatar.key,
        },
        select: {
          username: true,
          displayName: true,
          bio: true,
          avatarKey: true,
        },
      });
    } catch {
      // Compensação: evita manter um upload órfão
      // quando a atualização do banco falhar.
      try {
        await this.storage.remove(avatar.key);
      } catch {
        // A limpeza poderá exigir uma rotina posterior.
      }

      throw new InternalServerErrorException('Could not update profile avatar');
    }

    if (currentProfile.avatarKey && currentProfile.avatarKey !== avatar.key) {
      try {
        await this.storage.remove(currentProfile.avatarKey);
      } catch {
        // A foto nova já está salva.
        // Uma falha de limpeza não deve desfazer o sucesso.
      }
    }

    return this.formatProfile(updatedProfile);
  }

  async removeMyAvatar(authProviderId: string) {
    const account = await this.findAccount(authProviderId);

    const currentProfile = await this.prisma.profile.findUnique({
      where: {
        userId: account.userId,
      },
      select: {
        avatarKey: true,
      },
    });

    if (!currentProfile) {
      throw new NotFoundException('Mosaic profile not found');
    }

    const updatedProfile = await this.prisma.profile.update({
      where: {
        userId: account.userId,
      },
      data: {
        avatarKey: null,
      },
      select: {
        username: true,
        displayName: true,
        bio: true,
        avatarKey: true,
      },
    });

    if (currentProfile.avatarKey) {
      try {
        await this.storage.remove(currentProfile.avatarKey);
      } catch {
        // O avatar já foi desvinculado do perfil.
        // A limpeza física poderá ser repetida depois.
      }
    }

    return this.formatProfile(updatedProfile);
  }
}
