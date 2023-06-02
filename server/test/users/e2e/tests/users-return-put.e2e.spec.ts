import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { NestApplication } from '@nestjs/core';
import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import prismaClient from 'test/prisma-client';
import {
  prepareAccessTokens,
  prepareAfter,
  prepareBefore,
} from '../preparations';

const currentUserId = 'users_return_put_current_user_id';
const secondUserId = 'users_return_put_second_user_id';

describe('users/return (PUT)', () => {
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
      await prismaClient.checkedUsers.create({
        data: {
          checkedId: currentUserId,
          wasCheckedId: secondUserId,
        },
      });

      // second user has required fields to find user
      const { secondUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/return')
        .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
    });

    it('should return an empty object', async () => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { wrongUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/return')
        .set('Cookie', [`accessToken=${wrongUserAccessToken}`]);
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Such user was not found');
    });
  });

  describe('when there is no such checked user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { secondUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/return')
        .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Not Found');
    });
  });

  describe('when user is already liked (=paired)', () => {
    let response: request.Response;

    beforeAll(async () => {
      await prismaClient.user.update({
        where: { id: secondUserId },
        data: {
          pairs: { connect: { id: currentUserId } },
        },
      });

      const { secondUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/return')
        .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Not Found');
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer).put('/users/return');
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
