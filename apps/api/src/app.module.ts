import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { IdentityModule } from './identity/identity.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ProfilesModule } from './profiles/profiles.module.js';
import { PromptsModule } from './prompts/prompts.module.js';

@Module({
  imports: [
    PrismaModule,
    IdentityModule,
    AuthModule,
    ProfilesModule,
    PromptsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
