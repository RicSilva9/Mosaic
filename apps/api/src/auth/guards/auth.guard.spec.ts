import { describe, expect, it, vi, beforeEach } from 'vitest';
import { type ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { AuthGuard } from './auth.guard.js';
import { AuthService } from '../auth.service.js';
import type { AuthenticatedRequest } from './auth.guard.js';

describe('AuthGuard', () => {
  const verifyAccessToken = vi.fn();

  const authService = {
    verifyAccessToken,
  } as unknown as AuthService;

  const guard = new AuthGuard(authService);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  function createContext(authorization?: string) {
    const request = {
      headers: {
        authorization,
      },
    } as AuthenticatedRequest;

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as ExecutionContext;

    return { context, request };
  }

  it('rejects requests without an authorization header', async () => {
    const { context } = createContext();

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );

    expect(verifyAccessToken).not.toHaveBeenCalled();
  });

  it('rejects an invalid authorization scheme', async () => {
    const { context } = createContext('Basic abc123');

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );

    expect(verifyAccessToken).not.toHaveBeenCalled();
  });

  it('rejects a Bearer header without a token', async () => {
    const { context } = createContext('Bearer');

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('rejects an authorization header with extra values', async () => {
    const { context } = createContext('Bearer valid-token extra-value');

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('accepts a valid token and attaches the user to the request', async () => {
    const authenticatedUser = {
      providerId: 'test-user-id',
      email: 'ricardo@example.com',
    };

    verifyAccessToken.mockResolvedValue(authenticatedUser);

    const { context, request } = createContext('Bearer valid-token');

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(verifyAccessToken).toHaveBeenCalledWith('valid-token');

    expect(request.user).toEqual(authenticatedUser);
  });

  it('rejects a token when verification fails', async () => {
    verifyAccessToken.mockRejectedValue(
      new UnauthorizedException('Invalid token'),
    );

    const { context } = createContext('Bearer invalid-token');

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
