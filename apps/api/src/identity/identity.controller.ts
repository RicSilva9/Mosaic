import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { IdentityService } from './identity.service.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { RegisterIdentityDto } from './dto/register-identity.dto.js';

import type { AuthenticatedRequest } from '../auth/guards/auth.guard.js';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @UseGuards(AuthGuard)
  @Post('register')
  async register(
    @Req() request: AuthenticatedRequest,
    @Body() body: RegisterIdentityDto,
  ) {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new Error('Authenticated user is missing');
    }

    return this.identityService.createIdentity({
      authProvider: 'supabase',
      authProviderId: authenticatedUser.providerId,
      email: authenticatedUser.email,
      username: body.username,
      displayName: body.displayName,
    });
  }
}
