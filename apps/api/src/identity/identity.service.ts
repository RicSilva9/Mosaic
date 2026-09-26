import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

interface CreateIdentityInput {
  authProvider: string;
  authProviderId: string;
  email?: string;
  username: string;
  displayName: string;
}

@Injectable()
export class IdentityService {
  constructor(private readonly prisma: PrismaService) {}

  async getIdentity(authProvider: string, authProviderId: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        authProvider_authProviderId: {
          authProvider,
          authProviderId,
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!account || !account.user.profile) {
      throw new NotFoundException('Mosaic profile not found');
    }

    return {
      id: account.user.id,
      profile: {
        username: account.user.profile.username,
        displayName: account.user.profile.displayName,
      },
    };
  }

  async createIdentity(input: CreateIdentityInput) {
    const normalizedUsername = input.username.trim().toLowerCase();

    const normalizedEmail = input.email?.trim().toLowerCase();

    // Verifica se a conta do provedor já foi cadastrada.
    const existingAccount = await this.prisma.account.findUnique({
      where: {
        authProvider_authProviderId: {
          authProvider: input.authProvider,
          authProviderId: input.authProviderId,
        },
      },
    });

    if (existingAccount) {
      throw new ConflictException(
        'This authentication account is already registered',
      );
    }

    // Verifica se o nome de usuário está disponível.
    const existingProfile = await this.prisma.profile.findUnique({
      where: {
        normalizedUsername,
      },
    });

    if (existingProfile) {
      throw new ConflictException('Username is already in use');
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        return tx.user.create({
          data: {
            account: {
              create: {
                authProvider: input.authProvider,
                authProviderId: input.authProviderId,
                email: input.email,
                normalizedEmail,
              },
            },
            profile: {
              create: {
                username: input.username.trim(),
                normalizedUsername,
                displayName: input.displayName.trim(),
              },
            },
          },
          include: {
            profile: true,
          },
        });
      });
    } catch (error) {
      // Proteção adicional contra cadastros simultâneos.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'An account or profile with these details already exists',
        );
      }

      throw error;
    }
  }
}
