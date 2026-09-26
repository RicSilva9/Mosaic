import { Controller, Get, Param } from '@nestjs/common';

import { ProfilesService } from './profiles.service.js';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    return this.profilesService.findByUsername(username);
  }
}
