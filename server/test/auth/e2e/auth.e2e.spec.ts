import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { HttpServer } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import prismaClient from 'test/prisma-client';
import { newUserStub, userStub } from 'test/users/stubs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('auth-e2e', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

  const jwtTokensPayload = {
    email: 'authUser@gmail.com',
    id: 'auth-current-user-id',
  };
  const configService = new ConfigService();
  const jwtService = new JwtService();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.use(cookieParser());

    await app.init();
    await prismaClient.$connect();

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await prismaClient.$transaction([
      prismaClient.token.deleteMany({
        where: {
          user: { email: { in: ['authUser@gmail.com', '789@gmail.com'] } },
        },
      }),
      prismaClient.user.deleteMany({
        where: { email: { in: ['authUser@gmail.com', '789@gmail.com'] } },
      }),
    ]);
    await app.close();
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    await prismaClient.$transaction([
      prismaClient.token.deleteMany({
        where: {
          user: { email: { in: ['authUser@gmail.com', '789@gmail.com'] } },
        },
      }),
      prismaClient.user.deleteMany({
        where: { email: { in: ['authUser@gmail.com', '789@gmail.com'] } },
      }),
    ]);
    await prismaClient.user.create({
      data: {
        id: 'auth-current-user-id',
        email: 'authUser@gmail.com',
        name: userStub().name,
        password:
          '$2a$07$HQtmk3r9h1Gg1YiOLO67duUs3GPDg5.KKCtPSm/152gqIALiRvs6q',
      },
    });
  });

  describe('auth/registration (POST)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).post('/auth/registration').send({
          email: '789@gmail.com',
          password: '123123123',
          name: userStub().name,
        });
      });

      it('should return a user', () => {
        expect(response.body).toEqual({
          ...newUserStub(),
          id: response.body.id,
          email: '789@gmail.com',
          name: userStub().name,
        });
      });

      it('should set jwt tokens in cookies', () => {
        expect(response.headers['set-cookie']).toBeDefined();
        expect(response.headers['set-cookie'][0]).toBeDefined();
        expect(response.headers['set-cookie'][1]).toBeDefined();
      });
    });

    describe('when such user already exists', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).post('/auth/registration').send({
          email: 'authUser@gmail.com',
          password: '123123123',
          name: userStub().name,
        });
      });

      it('should throw an error', () => {
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('User already exists');
      });
    });
  });

  describe('auth/login (POST)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).post('/auth/login').send({
          email: 'authUser@gmail.com',
          password: '123123123',
        });
      });

      it('should return a user', () => {
        expect(response.body).toEqual({
          ...newUserStub(),
          id: 'auth-current-user-id',
          email: 'authUser@gmail.com',
          name: userStub().name,
        });
      });

      it('should set jwt tokens in cookies', () => {
        expect(response.headers['set-cookie']).toBeDefined();
        expect(response.headers['set-cookie'][0]).toBeDefined();
        expect(response.headers['set-cookie'][1]).toBeDefined();
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).post('/auth/login').send({
          email: 'wrongEmail@mail.ru',
          password: '123123123',
        });
      });

      it('should throw an error', () => {
        expect(response.status).toBe(403);
        expect(response.body.message).toEqual('Incorrect email or password');
      });
    });

    describe('when password is wrong', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).post('/auth/login').send({
          email: 'authUser@gmail.com',
          password: 'wrong-password',
        });
      });

      it('should throw an error', () => {
        expect(response.status).toBe(403);
        expect(response.body.message).toEqual('Incorrect email or password');
      });
    });
  });

  describe('auth/logout (PATCH)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;
      beforeAll(async () => {
        const accessToken = jwtService.sign(jwtTokensPayload, {
          expiresIn: '15m',
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
        });
        const refreshToken = jwtService.sign(jwtTokensPayload, {
          expiresIn: '7d',
          secret: configService.get<string>('JWT_REFRESH_SECRET'),
        });
        await prismaClient.token.create({
          data: {
            refreshToken,
            user: { connect: { id: 'auth-current-user-id' } },
          },
        });

        response = await request(httpServer)
          .patch('/auth/logout')
          .send({})
          .set('Cookie', [
            `refreshToken=${refreshToken}`,
            `accessToken=${accessToken}`,
          ]);
      });

      it('should return empty object', () => {
        expect(response.body).toEqual({});
      });
    });

    describe('when it is called only with accessToken', () => {
      let response: request.Response;

      beforeAll(async () => {
        const accessToken = jwtService.sign(jwtTokensPayload, {
          expiresIn: '15m',
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
        });

        response = await request(httpServer)
          .patch('/auth/logout')
          .send({})
          .set('Cookie', [`accessToken=${accessToken}`]);
      });

      it('should throw an error', () => {
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });

    describe('when it is called only with refreshToken', () => {
      let response: request.Response;

      beforeAll(async () => {
        const refreshToken = jwtService.sign(jwtTokensPayload, {
          expiresIn: '7d',
          secret: configService.get<string>('JWT_REFRESH_SECRET'),
        });
        await prismaClient.token.create({
          data: {
            refreshToken,
            user: { connect: { id: 'auth-current-user-id' } },
          },
        });

        response = await request(httpServer)
          .patch('/auth/logout')
          .send({})
          .set('Cookie', [`refreshToken=${refreshToken}`]);
      });

      it('should throw an error', () => {
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });

    describe('when it is called without cookies', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).patch('/auth/logout').send({});
      });

      it('should throw an error', () => {
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });
  });

  describe('auth/refresh (GET)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        const accessToken = jwtService.sign(jwtTokensPayload, {
          expiresIn: '15m',
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
        });
        const refreshToken = jwtService.sign(jwtTokensPayload, {
          expiresIn: '7d',
          secret: configService.get<string>('JWT_REFRESH_SECRET'),
        });
        await prismaClient.token.create({
          data: {
            refreshToken,
            user: { connect: { id: 'auth-current-user-id' } },
          },
        });

        response = await request(httpServer)
          .get('/auth/refresh')
          .set('Cookie', [
            `refreshToken=${refreshToken}`,
            `accessToken=${accessToken}`,
          ]);
      });

      it('should set jwt tokens in cookies', () => {
        expect(response.headers['set-cookie']).toBeDefined();
        expect(response.headers['set-cookie'][0]).toBeDefined();
        expect(response.headers['set-cookie'][1]).toBeDefined();
      });

      it('should return a user', () => {
        expect(response.body).toEqual({
          ...newUserStub(),
          id: 'auth-current-user-id',
          email: 'authUser@gmail.com',
          name: userStub().name,
        });
      });
    });

    describe('when it is called only with accessToken', () => {
      let response: request.Response;

      beforeAll(async () => {
        const accessToken = jwtService.sign(jwtTokensPayload, {
          expiresIn: '15m',
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
        });

        response = await request(httpServer)
          .patch('/auth/logout')
          .send({})
          .set('Cookie', [`accessToken=${accessToken}`]);
      });

      it('should throw an error', () => {
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });

    describe('when it is called only with refreshToken', () => {
      let response: request.Response;

      beforeAll(async () => {
        const refreshToken = jwtService.sign(jwtTokensPayload, {
          expiresIn: '7d',
          secret: configService.get<string>('JWT_REFRESH_SECRET'),
        });
        await prismaClient.token.create({
          data: {
            refreshToken,
            user: { connect: { id: 'auth-current-user-id' } },
          },
        });

        response = await request(httpServer)
          .patch('/auth/logout')
          .send({})
          .set('Cookie', [`refreshToken=${refreshToken}`]);
      });

      it('should throw an error', () => {
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });

    describe('when it is called without cookies', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).patch('/auth/logout').send({});
      });

      it('should throw an error', () => {
        expect(response.status).toEqual(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });
  });
});
