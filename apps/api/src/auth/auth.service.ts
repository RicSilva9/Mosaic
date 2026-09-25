import { Injectable, Optional, UnauthorizedException } from '@nestjs/common';
import {
  createRemoteJWKSet,
  jwtVerify,
  type JWTPayload,
  type JWTVerifyGetKey,
} from 'jose';

export interface AuthenticatedUser {
  providerId: string;
  email?: string;
}

export interface AuthServiceOptions {
  issuer: string;
  jwks: JWTVerifyGetKey;
}

@Injectable()
export class AuthService {
  private readonly issuer: string;
  private readonly jwks: JWTVerifyGetKey;

  constructor(@Optional() options?: AuthServiceOptions) {
    if (options) {
      this.issuer = options.issuer;
      this.jwks = options.jwks;
      return;
    }

    const supabaseUrl = process.env.SUPABASE_URL;

    if (!supabaseUrl) {
      throw new Error('SUPABASE_URL is not configured');
    }

    this.issuer = `${supabaseUrl.replace(/\/$/, '')}/auth/v1`;

    this.jwks = createRemoteJWKSet(
      new URL(`${this.issuer}/.well-known/jwks.json`),
    );
  }

  async verifyAccessToken(token: string): Promise<AuthenticatedUser> {
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
        audience: 'authenticated',
        algorithms: ['ES256'],
      });

      return this.extractUser(payload);
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  private extractUser(payload: JWTPayload): AuthenticatedUser {
    if (typeof payload.sub !== 'string' || payload.sub.length === 0) {
      throw new UnauthorizedException(
        'Token does not contain a valid user identifier',
      );
    }

    return {
      providerId: payload.sub,
      email: typeof payload.email === 'string' ? payload.email : undefined,
    };
  }
}
