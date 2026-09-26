import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  PayloadTooLargeException,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { memoryStorage } from 'multer';

import { AuthGuard } from '../auth/guards/auth.guard.js';
import type { AuthenticatedRequest } from '../auth/guards/auth.guard.js';
import { MAX_AVATAR_SIZE } from '../storage/avatar.validator.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfilesService } from './profiles.service.js';

type AvatarUpload = Express.Multer.File;

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  private getProviderId(request: AuthenticatedRequest): string {
    const authenticatedUser = request.user;

    if (!authenticatedUser) {
      throw new UnauthorizedException('Authentication is required');
    }

    return authenticatedUser.providerId;
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  async updateMyProfile(
    @Req() request: AuthenticatedRequest,
    @Body() body: UpdateProfileDto,
  ) {
    return this.profilesService.updateMyProfile(
      this.getProviderId(request),
      body,
    );
  }

  @Post('me/avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
      limits: {
        fileSize: MAX_AVATAR_SIZE,
        files: 1,
        fields: 0,
        parts: 1,
      },
    }),
  )
  async uploadMyAvatar(
    @Req() request: AuthenticatedRequest,
    @UploadedFile() file?: AvatarUpload,
  ) {
    if (!file) {
      throw new BadRequestException('Avatar file is required');
    }

    if (file.size > MAX_AVATAR_SIZE) {
      throw new PayloadTooLargeException('Avatar must not exceed 2 MB');
    }

    return this.profilesService.uploadMyAvatar(
      this.getProviderId(request),
      file.buffer,
    );
  }

  @Delete('me/avatar')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async removeMyAvatar(@Req() request: AuthenticatedRequest) {
    return this.profilesService.removeMyAvatar(this.getProviderId(request));
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    return this.profilesService.findByUsername(username);
  }
}
