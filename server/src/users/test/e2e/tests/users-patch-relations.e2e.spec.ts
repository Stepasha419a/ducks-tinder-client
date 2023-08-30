import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { NestApplication } from '@nestjs/core';
import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import prismaClient from 'prisma/test/prisma-client';
import { UPDATE_USER_RELATIONS_DTO } from 'users/test/values/users.const.dto';
import { USERS_PATCH_RELATIONS_EXPECT } from 'users/test/values/users.e2e-const.expect';
import {
  prepareAccessTokens,
  prepareAfter,
  prepareBefore,
} from '../preparations';

const currentUserId = 'patch_relations_current_user_id';
const secondUserId = 'patch_relations_second_user_id';

describe('users/relations (PATCH)', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

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
    await prismaClient.$transaction([
      prismaClient.attentionSign.delete({
        where: { id: 'attention-sign-id' },
      }),
      prismaClient.childrenAttitude.delete({
        where: { id: 'children-attitude-id' },
      }),
      prismaClient.communicationStyle.delete({
        where: { id: 'communication-style-id' },
      }),
      prismaClient.education.delete({
        where: { id: 'education-id' },
      }),
      prismaClient.personalityType.delete({
        where: { id: 'personality-type-id' },
      }),
      prismaClient.zodiacSign.delete({
        where: { id: 'zodiac-sign-id' },
      }),
      prismaClient.interest.deleteMany({
        where: {
          id: { in: ['interest-id-1', 'interest-id-2'] },
        },
      }),
    ]);

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
      await prismaClient.$transaction([
        prismaClient.attentionSign.create({
          data: { name: 'attention-sign', id: 'attention-sign-id' },
        }),
        prismaClient.childrenAttitude.create({
          data: { name: 'children-attitude', id: 'children-attitude-id' },
        }),
        prismaClient.communicationStyle.create({
          data: { name: 'communication-style', id: 'communication-style-id' },
        }),
        prismaClient.education.create({
          data: { name: 'education', id: 'education-id' },
        }),
        prismaClient.personalityType.create({
          data: { name: 'personality-type', id: 'personality-type-id' },
        }),
        prismaClient.zodiacSign.create({
          data: { name: 'zodiac-sign', id: 'zodiac-sign-id' },
        }),
        prismaClient.interest.createMany({
          data: [
            { name: 'interest-1', id: 'interest-id-1' },
            { name: 'interest-2', id: 'interest-id-2' },
          ],
        }),
      ]);

      const { currentUserAccessToken } = prepareAccessTokens(
        currentUserId,
        secondUserId,
      );

      response = await request(httpServer)
        .patch('/users/relations')
        .send(UPDATE_USER_RELATIONS_DTO)
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should return a user', () => {
      const user = response.body;
      expect(response.status).toBe(200);

      expect(user).toEqual(USERS_PATCH_RELATIONS_EXPECT);
    });
  });

  describe('when there is no such user', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { wrongUserAccessToken } = prepareAccessTokens(
        currentUserId,
        secondUserId,
      );

      response = await request(httpServer)
        .patch('/users/relations')
        .send(UPDATE_USER_RELATIONS_DTO)
        .set('Authorization', `Bearer ${wrongUserAccessToken}`);
    });

    it('should throw an error', () => {
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Not Found');
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer)
        .patch('/users/relations')
        .send({ name: 'William' });
    });

    it('should throw an error', () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
