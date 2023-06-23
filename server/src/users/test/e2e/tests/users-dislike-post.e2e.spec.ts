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

const currentUserId = 'users_dislike_post_current_user_id';
const secondUserId = 'users_dislike_post_second_user_id';

describe('users/dislike/:id (POST)', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

  const prepareReadyAccessTokens = () =>
    prepareAccessTokens(currentUserId, secondUserId);

  let currentUser: UserDto;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.use(cookieParser());

    await app.init();
    await prismaClient.$connect();

    const users = await prepareBefore(currentUserId, secondUserId);
    currentUser = users.currentUser;

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
      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post(`/users/dislike/${secondUserId}`)
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should return an empty object', () => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });
  });

  describe('when user tries to like himself', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post(`/users/dislike/${currentUserId}`)
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('You can not dislike yourself');
    });
  });

  describe('when second user is already checked by current user', () => {
    let response: request.Response;

    beforeAll(async () => {
      await prismaClient.checkedUsers.create({
        data: {
          checkedId: secondUserId,
          wasCheckedId: currentUserId,
        },
      });

      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post(`/users/dislike/${secondUserId}`)
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('User is already checked');
    });
  });

  describe('when current user is already checked by second user', () => {
    let response: request.Response;

    beforeAll(async () => {
      await prismaClient.checkedUsers.create({
        data: {
          checkedId: currentUserId,
          wasCheckedId: secondUserId,
        },
      });

      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post(`/users/dislike/${secondUserId}`)
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('User is already checked');
    });
  });

  describe('when second user is already pair for current user', () => {
    let response: request.Response;

    beforeAll(async () => {
      await prismaClient.user.update({
        where: { id: currentUser.id },
        data: {
          pairs: { connect: { id: secondUserId } },
        },
      });
      await prismaClient.checkedUsers.create({
        data: {
          checkedId: currentUserId,
          wasCheckedId: secondUserId,
        },
      });

      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post(`/users/dislike/${secondUserId}`)
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('User is already checked');
    });
  });

  describe('when current user is already pair for second user', () => {
    let response: request.Response;

    beforeAll(async () => {
      await prismaClient.user.update({
        where: { id: secondUserId },
        data: {
          pairs: { connect: { id: currentUserId } },
        },
      });
      await prismaClient.checkedUsers.create({
        data: {
          checkedId: secondUserId,
          wasCheckedId: currentUserId,
        },
      });

      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post(`/users/dislike/${secondUserId}`)
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('User is already checked');
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { wrongUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post(`/users/dislike/${secondUserId}`)
        .set('Cookie', [`accessToken=${wrongUserAccessToken}`]);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Such user was not found');
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post('/users/dislike/wrong-id')
        .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Such user was not found');
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer).post(
        `/users/dislike/${secondUserId}`,
      );
    });

    it('should throw an error', () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
