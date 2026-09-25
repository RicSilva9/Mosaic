import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { createLocalJWKSet, exportJWK, generateKeyPair, SignJWT } from 'jose';

import { AuthModule } from './auth.module.js';
import { AuthService } from './auth.service.js';

describe('Auth HTTP with real JWT verification', () => {
  const issuer = 'https://mosaic-test.supabase.co/auth/v1';
  const keyId = 'mosaic-test-key';

  let app: INestApplication;
  let privateKey: Awaited<ReturnType<typeof generateKeyPair>>['privateKey'];

  beforeAll(async () => {
    const keys = await generateKeyPair('ES256');

    privateKey = keys.privateKey;

    const publicJwk = await exportJWK(keys.publicKey);

    publicJwk.kid = keyId;
    publicJwk.alg = 'ES256';
    publicJwk.use = 'sig';

    const authService = new AuthService({
      issuer,
      jwks: createLocalJWKSet({
        keys: [publicJwk],
      }),
    });

    const module = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  async function createToken() {
    return new SignJWT({
      email: 'test@example.com',
      role: 'authenticated',
    })
      .setProtectedHeader({
        alg: 'ES256',
        kid: keyId,
      })
      .setIssuer(issuer)
      .setAudience('authenticated')
      .setSubject('test-user-id')
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(privateKey);
  }

  it('accepts a correctly signed JWT over HTTP', async () => {
    const token = await createToken();

    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual({
      user: {
        providerId: 'test-user-id',
        email: 'test@example.com',
      },
    });
  });

  it('rejects a JWT with an invalid signature', async () => {
    const token = await createToken();

    const parts = token.split('.');
    const signature = parts[2];

    if (!signature) {
      throw new Error('Test token has no signature');
    }

    parts[2] = (signature[0] === 'A' ? 'B' : 'A') + signature.slice(1);

    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${parts.join('.')}`)
      .expect(401);
  });

  it('rejects requests without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .expect(401);

    expect(response.body.message).toBe('Authorization header is missing');
  });
});
