import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  Get,
} from '@nestjs/common';

import { IdentityService } from './identity.service.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { RegisterIdentityDto } from './dto/register-identity.dto.js';

import type { AuthenticatedRequest } from '../auth/guards/auth.guard.js';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() request: AuthenticatedRequest) {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new UnauthorizedException('Authentication is required');
    }

    return this.identityService.getIdentity(
      'supabase',
      authenticatedUser.providerId,
    );
  }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(
    @Req() request: AuthenticatedRequest,
    @Body() body: RegisterIdentityDto,
  ) {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new UnauthorizedException('Authentication is required');
    }

    const user = await this.identityService.createIdentity({
      authProvider: 'supabase',
      authProviderId: authenticatedUser.providerId,
      email: authenticatedUser.email,
      username: body.username,
      displayName: body.displayName,
    });

    return {
      id: user.id,
      profile: {
        username: user.profile?.username,
        displayName: user.profile?.displayName,
      },
    };
  }
}
