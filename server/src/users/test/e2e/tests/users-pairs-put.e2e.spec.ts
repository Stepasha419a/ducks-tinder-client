import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { NestApplication } from '@nestjs/core';
import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import prismaClient from 'prisma/test/prisma-client';
import {
  prepareAccessTokens,
  prepareAfter,
  prepareBefore,
} from '../preparations';
import { USERS_PAIRS_PUT_EXPECT } from 'users/test/values/users.e2e-const.expect';

const currentUserId = 'users_pairs_put_current_user_id';
const secondUserId = 'users_pairs_put_second_user_id';

describe('users/pairs/:id (PUT)', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

  const prepareReadyAccessTokens = () =>
    prepareAccessTokens(currentUserId, secondUserId);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.use(cookieParser());

    await app.init();
    await prismaClient.$connect();

    await prepareBefore(currentUserId, secondUserId);

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await prepareAfter(currentUserId, secondUserId);

    await app.close();
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    await prepareAfter(currentUserId, secondUserId);
    await prepareBefore(currentUserId, secondUserId);
  });

  describe('when it is called correctly', () => {
    let response: request.Response;

    beforeAll(async () => {
      await prismaClient.user.update({
        where: { id: currentUserId },
        data: { pairs: { connect: { id: secondUserId } } },
      });

      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put(`/users/pairs/${secondUserId}`)
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should return deleted pair', () => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual(USERS_PAIRS_PUT_EXPECT);
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { wrongUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put(`/users/pairs/${secondUserId}`)
        .set('Authorization', `Bearer ${wrongUserAccessToken}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Not Found');
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/pairs/wrong-id')
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Not Found');
    });
  });

  describe('when such pair does not exist', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { secondUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put(`/users/pairs/${currentUserId}`)
        .set('Authorization', `Bearer ${secondUserAccessToken}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Not Found');
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer).put(`/users/pairs/${secondUserId}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
