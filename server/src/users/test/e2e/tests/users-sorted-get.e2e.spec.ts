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
import { USERS_SORTED_GET_EXPECT } from 'users/test/values/users.e2e-const.expect';

const currentUserId = 'sorted_current_user_id';
const secondUserId = 'sorted_second_user_id';

describe('users/sorted (GET)', () => {
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
        where: { id: secondUserId },
        data: {
          age: 20,
          distance: 50,
          preferAgeFrom: 18,
          preferAgeTo: 28,
          preferSex: 'male',
          sex: 'female',
        },
      });
      await prismaClient.user.update({
        where: { id: currentUserId },
        data: {
          age: 18,
          distance: 90,
          preferAgeFrom: 18,
          preferAgeTo: 26,
          sex: 'male',
          preferSex: 'female',
        },
      });

      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .get('/users/sorted')
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should return a user', () => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual(USERS_SORTED_GET_EXPECT);
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { wrongUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .get('/users/sorted')
        .set('Cookie', [`accessToken=${wrongUserAccessToken}`]);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Such user was not found');
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer).get('/users/sorted');
    });

    it('should throw an error', () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
