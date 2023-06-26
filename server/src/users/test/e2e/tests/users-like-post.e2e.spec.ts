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

const currentUserId = 'like_post_current_user_id';
const secondUserId = 'like_post_second_user_id';

describe('users/like/:id (POST)', () => {
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
      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post(`/users/like/${secondUserId}`)
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
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
        .post(`/users/like/${currentUserId}`)
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('You can not like yourself');
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
        .post(`/users/like/${secondUser.id}`)
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        'Pair with such an id already exists or such user is already checked',
      );
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
        .post(`/users/like/${secondUser.id}`)
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        'Pair with such an id already exists or such user is already checked',
      );
    });
  });

  describe('when second user is already pair for current user', () => {
    let response: request.Response;

    beforeAll(async () => {
      await prismaClient.user.update({
        where: { id: currentUserId },
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
        .post(`/users/like/${secondUser.id}`)
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        'Pair with such an id already exists or such user is already checked',
      );
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
        .post(`/users/like/${secondUser.id}`)
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        'Pair with such an id already exists or such user is already checked',
      );
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { wrongUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .post(`/users/like/${secondUserId}`)
        .set('Authorization', `Bearer ${wrongUserAccessToken}`);
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
        .post('/users/like/wrong-id')
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Such user was not found');
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer).post(`/users/like/${secondUser.id}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
