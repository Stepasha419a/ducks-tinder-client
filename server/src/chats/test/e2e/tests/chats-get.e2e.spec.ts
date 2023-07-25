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
import { GET_CHATS_EXPECTED } from 'chats/test/values/chats.const.expect';

const currentUserId = 'chats_get_current_user_id';
const secondUserId = 'chats_get_second_user_id';
const chatId = 'chats_get_chat_id';

describe('chats (GET)', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

  const prepareReadyAccessTokens = () => prepareAccessTokens(currentUserId);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.use(cookieParser());

    await app.init();
    await prismaClient.$connect();

    await prepareBefore(currentUserId, secondUserId, chatId);

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await prepareAfter(currentUserId, secondUserId);
    await app.close();
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    await prepareAfter(currentUserId, secondUserId);
    await prepareBefore(currentUserId, secondUserId, chatId);
  });

  describe('when it is called correctly', () => {
    let response: request.Response;

    beforeAll(async () => {
      const { currentUserAccessToken } = prepareReadyAccessTokens();

      response = await request(httpServer)
        .get('/chats')
        .set('Authorization', `Bearer ${currentUserAccessToken}`);
    });

    it('should return an array of short chats', () => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual(GET_CHATS_EXPECTED);
    });
  });

  describe('when there is no access token', () => {
    let response: request.Response;

    beforeAll(async () => {
      response = await request(httpServer).get('/chats');
    });

    it('should throw an error', () => {
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Unauthorized');
    });
  });
});
