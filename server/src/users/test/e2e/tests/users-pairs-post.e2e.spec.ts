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

const currentUserId = 'users_pairs_post_current_user_id';
const secondUserId = 'users_pairs_post_second_user_id';

describe('users/pairs/:id (POST)', () => {
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
    await prismaClient.chat.deleteMany({
      where: {
        users: {
          every: {
            id: {
              in: [
                'users_pairs_post_current_user_id',
                'users_pairs_post_second_user_id',
              ],
            },
          },
        },
      },
    });
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
        .post(`/users/pairs/${secondUserId}`)
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should return an empty array of pairs', () => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer).post(`/users/pairs/${secondUserId}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
