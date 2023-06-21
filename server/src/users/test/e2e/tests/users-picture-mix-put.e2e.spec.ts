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
import { UsersSelector } from 'users/users.selector';

const currentUserId = 'picture_mix_current_user_id';
const secondUserId = 'picture_mix_second_user_id';

describe('users/picture/mix (PUT)', () => {
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
    let currentUser;

    beforeAll(async () => {
      currentUser = new UserDto(
        await prismaClient.user.update({
          where: { id: currentUserId },
          data: {
            pictures: {
              createMany: {
                data: [
                  { name: 'picture-name-0', order: 0 },
                  { name: 'picture-name-1', order: 1 },
                  { name: 'picture-name', order: 2 },
                  { name: 'picture-name', order: 3 },
                  { name: 'picture-name', order: 4 },
                  { name: 'picture-name', order: 5 },
                  { name: 'picture-name', order: 6 },
                  { name: 'picture-name', order: 7 },
                  { name: 'picture-name', order: 8 },
                ],
              },
            },
          },
          include: UsersSelector.selectUser(),
        }),
      );

      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/picture/mix')
        .send({ mixOrder: 0, withOrder: 1 })
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should return a user', async () => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...currentUser,
        pairsCount: 0,
        pictures: [
          { ...currentUser.pictures[1], order: 0 },
          { ...currentUser.pictures[0], order: 1 },
          ...currentUser.pictures.slice(2),
        ],
      });
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { wrongUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/picture/mix')
        .send({ mixOrder: 0, withOrder: 1 })
        .set('Cookie', [`accessToken=${wrongUserAccessToken}`]);
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Such user was not found');
    });
  });

  describe('when there is no such picture', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/picture/mix')
        .send({ mixOrder: 10, withOrder: 1 })
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Not Found');
    });
  });

  describe('when there is no such picture', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/picture/mix')
        .send({ mixOrder: 0, withOrder: 10 })
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Not Found');
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer)
        .put('/users/picture/mix')
        .send({ mixOrder: 1, withOrder: 10 });
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
