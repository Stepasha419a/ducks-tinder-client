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
import { USERS_PICTURE_MIX_PUT_DTO } from 'users/test/values/users.e2e-const.dto';
import { USERS_PICTURE_MIX_PUT_EXPECT } from 'users/test/values/users.e2e-const.expect';

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
                  { name: 'picture-name-2', order: 2 },
                  { name: 'picture-name-3', order: 3 },
                  { name: 'picture-name-4', order: 4 },
                  { name: 'picture-name-5', order: 5 },
                  { name: 'picture-name-6', order: 6 },
                  { name: 'picture-name-7', order: 7 },
                  { name: 'picture-name-8', order: 8 },
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
        .send(USERS_PICTURE_MIX_PUT_DTO)
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should return a user', () => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...currentUser,
        pairsCount: 0,
        pictures: USERS_PICTURE_MIX_PUT_EXPECT,
      });
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer)
        .put('/users/picture/mix')
        .send(USERS_PICTURE_MIX_PUT_DTO);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
