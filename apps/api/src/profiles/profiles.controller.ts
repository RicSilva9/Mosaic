import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/guards/auth.guard.js';
import type { AuthenticatedRequest } from '../auth/guards/auth.guard.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfilesService } from './profiles.service.js';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Patch('me')
  @UseGuards(AuthGuard)
  async updateMyProfile(
    @Req() request: AuthenticatedRequest,
    @Body() body: UpdateProfileDto,
  ) {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new UnauthorizedException('Authentication is required');
    }

    return this.profilesService.updateMyProfile(
      authenticatedUser.providerId,
      body,
    );
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    return this.profilesService.findByUsername(username);
  }
}
