import { ConflictException, Injectable } from '@nestjs/common';
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

  async createIdentity(input: CreateIdentityInput) {
    const normalizedUsername = input.username.trim().toLowerCase();
    const normalizedEmail = input.email?.trim().toLowerCase();

    const existingProfile = await this.prisma.profile.findUnique({
      where: { normalizedUsername },
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
