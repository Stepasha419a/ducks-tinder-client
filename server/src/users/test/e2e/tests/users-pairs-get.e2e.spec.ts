import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { NestApplication } from '@nestjs/core';
import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import prismaClient from 'prisma/test/prisma-client';
import { UserDto } from 'users/dto';
import {
  prepareAccessTokens,
  prepareAfter,
  prepareBefore,
} from '../preparations';

const currentUserId = 'users_pairs_get_current_user_id';
const secondUserId = 'users_pairs_get_second_user_id';

describe('users/pairs (GET)', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

  let secondUser: UserDto;

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
    const users = await prepareBefore(currentUserId, secondUserId);
    secondUser = users.secondUser;
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
        .get('/users/pairs')
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should return a user', async () => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: secondUserId,
          name: secondUser.name,
          description: secondUser.description,
          distance: secondUser.distance,
          interests: secondUser.interests,
          age: secondUser.age,
          place: secondUser.place,
          isActivated: secondUser.isActivated,
          pictures: secondUser.pictures,
        },
      ]);
    });
  });

  describe('when there is no pairs', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { secondUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .get('/users/pairs')
        .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
    });

    it('should return an empty array of pairs', async () => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { wrongUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .get('/users/pairs')
        .set('Cookie', [`accessToken=${wrongUserAccessToken}`]);
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Such user was not found');
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer).get('/users/pairs');
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});