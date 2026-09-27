import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PromptsController } from './prompts.controller.js';
import { PromptsService } from './prompts.service.js';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [PromptsController],
  providers: [PromptsService],
})
export class PromptsModule {}
