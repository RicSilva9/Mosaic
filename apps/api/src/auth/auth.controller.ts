import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from './guards/auth.guard.js';
import type { AuthenticatedRequest } from './guards/auth.guard.js';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() request: AuthenticatedRequest) {
    return {
      user: request.user,
    };
  }
}
