import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';

const currentDirectory = fileURLToPath(new URL('.', import.meta.url));

const envPath = resolve(currentDirectory, '.env.test');

const result = config({
  path: envPath,
  override: true,
});

if (result.error) {
  throw new Error(
    `Failed to load integration test environment: ${result.error.message}`,
  );
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from .env.test');
}

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    root: currentDirectory,
    include: ['**/*.integration.spec.ts'],
    fileParallelism: false,
  },
});
