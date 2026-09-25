import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService, type AuthenticatedUser } from '../auth.service.js';

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [scheme, token, ...extra] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token || extra.length > 0) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    request.user = await this.authService.verifyAccessToken(token);

    return true;
  }
}
