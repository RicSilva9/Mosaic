import { beforeAll, describe, expect, it } from 'vitest';
import { UnauthorizedException } from '@nestjs/common';
import { createLocalJWKSet, exportJWK, generateKeyPair, SignJWT } from 'jose';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  const issuer = 'https://mosaic-test.supabase.co/auth/v1';

  let service: AuthService;
  let privateKey: Awaited<ReturnType<typeof generateKeyPair>>['privateKey'];

  beforeAll(async () => {
    const keys = await generateKeyPair('ES256');

    privateKey = keys.privateKey;

    const publicJwk = await exportJWK(keys.publicKey);

    publicJwk.kid = 'mosaic-test-key';
    publicJwk.alg = 'ES256';
    publicJwk.use = 'sig';

    service = new AuthService({
      issuer,
      jwks: createLocalJWKSet({
        keys: [publicJwk],
      }),
    });
  });

  async function createToken(
    options: {
      issuer?: string;
      audience?: string;
      subject?: string;
      expiration?: string;
    } = {},
  ) {
    return new SignJWT({
      email: 'ricardo@example.com',
      role: 'authenticated',
    })
      .setProtectedHeader({
        alg: 'ES256',
        kid: 'mosaic-test-key',
      })
      .setIssuer(options.issuer ?? issuer)
      .setAudience(options.audience ?? 'authenticated')
      .setSubject(options.subject ?? 'test-user-id')
      .setIssuedAt()
      .setExpirationTime(options.expiration ?? '1h')
      .sign(privateKey);
  }

  it('accepts a valid access token', async () => {
    const token = await createToken();

    await expect(service.verifyAccessToken(token)).resolves.toEqual({
      providerId: 'test-user-id',
      email: 'ricardo@example.com',
    });
  });

  it('rejects an expired token', async () => {
    const token = await createToken({
      expiration: '-1h',
    });

    await expect(service.verifyAccessToken(token)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('rejects a token with an invalid signature', async () => {
    const token = await createToken();

    const parts = token.split('.');
    const signature = parts[2];

    if (!signature) {
      throw new Error('Test token has no signature');
    }

    parts[2] = (signature[0] === 'A' ? 'B' : 'A') + signature.slice(1);

    await expect(service.verifyAccessToken(parts.join('.'))).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('rejects an incorrect audience', async () => {
    const token = await createToken({
      audience: 'anonymous',
    });

    await expect(service.verifyAccessToken(token)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('rejects an incorrect issuer', async () => {
    const token = await createToken({
      issuer: 'https://invalid.example.com/auth/v1',
    });

    await expect(service.verifyAccessToken(token)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('rejects a token without a user identifier', async () => {
    const token = await new SignJWT({
      role: 'authenticated',
    })
      .setProtectedHeader({
        alg: 'ES256',
        kid: 'mosaic-test-key',
      })
      .setIssuer(issuer)
      .setAudience('authenticated')
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(privateKey);

    await expect(service.verifyAccessToken(token)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
