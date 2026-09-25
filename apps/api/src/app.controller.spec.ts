import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma.service.js';

describe('AppController', () => {
  let appController: AppController;

  const prismaMock = {
    databaseCheck: {
      count: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('database-check', () => {
    it('should return the database connection status', async () => {
      prismaMock.databaseCheck.count.mockResolvedValue(0);

      await expect(appController.checkDatabase()).resolves.toEqual({
        status: 'connected',
        database: 'postgresql',
        records: 0,
      });
    });
  });
});
