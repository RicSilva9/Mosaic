import { describe, expect, it } from 'vitest';
import { AuthController } from './auth.controller.js';
import type { AuthenticatedRequest } from './guards/auth.guard.js';

describe('AuthController', () => {
  const controller = new AuthController();

  it('returns the authenticated user', () => {
    const user = {
      providerId: 'test-user-id',
      email: 'test@example.com',
    };

    const request = {
      user,
    } as AuthenticatedRequest;

    expect(controller.getMe(request)).toEqual({
      user,
    });
  });

  it('does not expose authorization headers', () => {
    const request = {
      headers: {
        authorization: 'Bearer sensitive-token',
      },
      user: {
        providerId: 'test-user-id',
      },
    } as AuthenticatedRequest;

    expect(controller.getMe(request)).toEqual({
      user: {
        providerId: 'test-user-id',
      },
    });
  });
});
