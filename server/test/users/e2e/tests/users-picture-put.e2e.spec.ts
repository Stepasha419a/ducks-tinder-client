import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as fs from 'fs';
import { ensureDir } from 'fs-extra';
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

const currentUserId = 'users_picture_put_current_user_id';
const secondUserId = 'users_picture_put_second_user_id';

describe('users/picture (PUT)', () => {
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
      // create entity
      await prismaClient.picture.create({
        data: {
          name: 'picture-name-1.jpg',
          order: 0,
          userId: currentUserId,
        },
      });
      // create dir
      await ensureDir(
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          'static',
          currentUserId,
        ),
      );
      // read and write image into the dir
      fs.readFile(
        path.resolve(__dirname, '..', '..', 'stubs', 'test-image.jpg'),
        (err, data) => {
          fs.writeFile(
            path.resolve(
              __dirname,
              '..',
              '..',
              '..',
              '..',
              'static',
              currentUserId,
              'picture-name-1.jpg',
            ),
            data,
            () => null,
          );
        },
      );

      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/picture')
        .send({ order: 0 })
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should return a user', async () => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...currentUser,
        pictures: [],
      });
    });
  });

  describe('when there is no such picture', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/picture')
        .send({ order: 1 })
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should throw an error', async () => {
      console.log(currentUser);
      console.log(response.body);
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Not Found');
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { wrongUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .put('/users/picture')
        .send({ order: 0 })
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
      response = await request(httpServer)
        .put('/users/picture')
        .send({ order: 0 });
    });

    it('should throw an error', async () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
