import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import { sync } from 'rimraf';
import { NestApplication } from '@nestjs/core';
import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import prismaClient from 'test/prisma-client';
import { UserDto } from 'users/dto';
import {
  prepareAccessTokens,
  prepareAfter,
  prepareBefore,
} from '../preparations';

const currentUserId = 'pictures_post_current_user_id';
const secondUserId = 'pictures_post_second_user_id';

describe('users/picture (POST)', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

  let currentUser: UserDto;

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
    sync(
      path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        `static\\${currentUserId}`,
      ),
    );
  });

  beforeEach(async () => {
    await prepareAfter(currentUserId, secondUserId);
    const users = await prepareBefore(currentUserId, secondUserId);
    currentUser = users.currentUser;
  });

  describe('when it is called correctly', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post('/users/picture')
        .attach(
          'picture',
          path.resolve(__dirname, '..', '..', 'stubs', 'test-image.jpg'),
        )
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should return a user', async () => {
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        new UserDto({
          ...currentUser,
          _count: { pairFor: 0 },
          pictures: [
            {
              name: response.body.pictures[0].name,
              order: 0,
            },
          ],
        }),
      );
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { wrongUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post('/users/picture')
        .attach(
          'picture',
          path.resolve(__dirname, '..', '..', 'stubs', 'test-image.jpg'),
        )
        .set('Cookie', [`accessToken=${wrongUserAccessToken}`]);
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Such user was not found');
    });
  });

  describe('when it is max pictures count', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { secondUserAccessToken } = prepareReadyAccessTokens();

      await prismaClient.user.update({
        where: { id: secondUserId },
        data: {
          pictures: {
            createMany: {
              data: [
                { name: 'picture-name', order: 0 },
                { name: 'picture-name', order: 1 },
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
      });

      response = await request(httpServer)
        .post('/users/picture')
        .attach(
          'picture',
          path.resolve(__dirname, '..', '..', 'stubs', 'test-image.jpg'),
        )
        .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('You have max pictures count');
    });
  });

  // e2e test for no access token always fails because of
  // https://stackoverflow.com/questions/71682239/supertest-failing-with-econnreset
});
