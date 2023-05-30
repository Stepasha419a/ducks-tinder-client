import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { NestApplication } from '@nestjs/core';
import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import prismaClient from 'test/prisma-client';
import { newUserStub } from '../stubs';
import {
  UPDATE_USER_DTO,
  DELETE_PICTURE_DTO,
  MIX_PICTURES_DTO,
} from '../values/users.const.dto';
import * as path from 'path';
import { UserDto } from 'users/dto';
import {
  prepareAccessTokens,
  prepareAfter,
  prepareBefore,
} from './preparations';

describe('users-e2e', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

  let currentUser: UserDto;
  let secondUser: UserDto;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.use(cookieParser());

    await app.init();
    await prismaClient.$connect();

    const users = await prepareBefore();
    currentUser = users.currentUser;
    secondUser = users.secondUser;

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await prepareAfter();
    await app.close();
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    await prepareAfter();
    await prepareBefore();
  });

  describe('users (PATCH)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .patch('/users')
          .send({
            ...UPDATE_USER_DTO,
            interests: [
              ...UPDATE_USER_DTO.interests,
              'wrong-interest-1',
              'wrong-interest-2',
            ],
          })
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should return a user', async () => {
        const user = response.body;
        expect(response.status).toBe(200);

        // to equal interest items by another way
        expect({ ...user, interests: undefined }).toEqual({
          ...newUserStub(),
          id: currentUser.id,
          email: UPDATE_USER_DTO.email,
          name: UPDATE_USER_DTO.name,
          interests: undefined,
        });
        expect(user.interests.length).toEqual(2);
        expect(user.interests).toContainEqual({
          name: UPDATE_USER_DTO.interests[0],
        });
        expect(user.interests).toContainEqual({
          name: UPDATE_USER_DTO.interests[1],
        });
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { wrongUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .patch('/users')
          .send({ name: 'William' })
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
          .patch('/users')
          .send({ name: 'William' });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });
  });

  describe('users/sorted (GET)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        await prismaClient.user.update({
          where: { id: 'current-user-id' },
          data: {
            age: 18,
            distance: 90,
            preferAgeFrom: 18,
            preferAgeTo: 26,
            sex: 'male',
            preferSex: 'female',
          },
        });

        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .get('/users/sorted')
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should return a user', async () => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          id: secondUser.id,
          age: secondUser.age,
          description: secondUser.description,
          distance: secondUser.distance,
          name: secondUser.name,
          pictures: secondUser.pictures,
          interests: [],
        });
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { wrongUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .get('/users/sorted')
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
        response = await request(httpServer).get('/users/sorted');
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });
  });

  describe('users/picture (POST)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post('/users/picture')
          .attach(
            'picture',
            path.resolve(__dirname, '..', 'stubs', 'test-image.jpg'),
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
        const { wrongUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post('/users/picture')
          .attach(
            'picture',
            path.resolve(__dirname, '..', 'stubs', 'test-image.jpg'),
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
        const { secondUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post('/users/picture')
          .attach(
            'picture',
            path.resolve(__dirname, '..', 'stubs', 'test-image.jpg'),
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

  describe('users/picture (PUT)', () => {
    beforeAll(async () => {
      const { currentUserAccessToken } = prepareAccessTokens();

      currentUser = (
        await request(httpServer)
          .post('/users/picture')
          .attach(
            'picture',
            path.resolve(__dirname, '..', 'stubs', 'test-image.jpg'),
          )
          .set('Cookie', [`accessToken=${currentUserAccessToken}`])
      ).body;
    });

    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/picture')
          .send({ ...DELETE_PICTURE_DTO, userId: currentUser.id })
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
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/picture')
          .send({ order: 0, userId: currentUser.id })
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Not Found');
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { wrongUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/picture')
          .send({ order: 0, userId: currentUser.id })
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
          .send({ order: 0, userId: currentUser.id });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });
  });

  describe('users/picture/mix (PUT)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { secondUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/picture/mix')
          .send({ ...MIX_PICTURES_DTO, userId: secondUser.id })
          .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
      });

      it('should return a user', async () => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          ...secondUser,
          pictures: [
            { ...secondUser.pictures[1], order: 0 },
            { ...secondUser.pictures[0], order: 1 },
            ...secondUser.pictures.slice(2),
          ],
        });
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { wrongUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/picture/mix')
          .send({ ...MIX_PICTURES_DTO, userId: 'wrong-id' })
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
        const { secondUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/picture/mix')
          .send({ mixOrder: 10, withOrder: 1, userId: secondUser.id })
          .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Not Found');
      });
    });

    describe('when there is no such picture', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { secondUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/picture/mix')
          .send({ mixOrder: 1, withOrder: 10, userId: secondUser.id })
          .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
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
          .send({ mixOrder: 1, withOrder: 10, userId: secondUser.id });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });
  });

  describe('users/like/:id (POST)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/like/${secondUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should return an empty object', async () => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
      });
    });

    describe('when user tries to like himself', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/like/${currentUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('You can not like yourself');
      });
    });

    describe('when second user is already checked by current user', () => {
      let response: request.Response;

      beforeAll(async () => {
        await prismaClient.checkedUsers.create({
          data: {
            checkedId: secondUser.id,
            wasCheckedId: currentUser.id,
          },
        });

        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/like/${secondUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
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
            checkedId: currentUser.id,
            wasCheckedId: secondUser.id,
          },
        });

        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/like/${secondUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
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
          where: { id: currentUser.id },
          data: {
            pairs: { connect: { id: secondUser.id } },
          },
        });
        await prismaClient.checkedUsers.create({
          data: {
            checkedId: currentUser.id,
            wasCheckedId: secondUser.id,
          },
        });

        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/like/${secondUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
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
          where: { id: secondUser.id },
          data: {
            pairs: { connect: { id: currentUser.id } },
          },
        });
        await prismaClient.checkedUsers.create({
          data: {
            checkedId: secondUser.id,
            wasCheckedId: currentUser.id,
          },
        });

        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/like/${secondUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual(
          'Pair with such an id already exists or such user is already checked',
        );
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { wrongUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/like/${secondUser.id}`)
          .set('Cookie', [`accessToken=${wrongUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post('/users/like/wrong-id')
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when there is no access token', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).post(
          `/users/like/${secondUser.id}`,
        );
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });
  });

  describe('users/dislike/:id (POST)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/dislike/${secondUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should return an empty object', async () => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
      });
    });

    describe('when user tries to like himself', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/dislike/${currentUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('You can not dislike yourself');
      });
    });

    describe('when second user is already checked by current user', () => {
      let response: request.Response;

      beforeAll(async () => {
        await prismaClient.checkedUsers.create({
          data: {
            checkedId: secondUser.id,
            wasCheckedId: currentUser.id,
          },
        });

        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/dislike/${secondUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('User is already checked');
      });
    });

    describe('when current user is already checked by second user', () => {
      let response: request.Response;

      beforeAll(async () => {
        await prismaClient.checkedUsers.create({
          data: {
            checkedId: currentUser.id,
            wasCheckedId: secondUser.id,
          },
        });

        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/dislike/${secondUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
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
            pairs: { connect: { id: secondUser.id } },
          },
        });
        await prismaClient.checkedUsers.create({
          data: {
            checkedId: currentUser.id,
            wasCheckedId: secondUser.id,
          },
        });

        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/dislike/${secondUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('User is already checked');
      });
    });

    describe('when current user is already pair for second user', () => {
      let response: request.Response;

      beforeAll(async () => {
        await prismaClient.user.update({
          where: { id: secondUser.id },
          data: {
            pairs: { connect: { id: currentUser.id } },
          },
        });
        await prismaClient.checkedUsers.create({
          data: {
            checkedId: secondUser.id,
            wasCheckedId: currentUser.id,
          },
        });

        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/dislike/${secondUser.id}`)
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('User is already checked');
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { wrongUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post(`/users/dislike/${secondUser.id}`)
          .set('Cookie', [`accessToken=${wrongUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .post('/users/dislike/wrong-id')
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when there is no access token', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).post(
          `/users/dislike/${secondUser.id}`,
        );
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });
  });

  describe('users/return (PUT)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        await prismaClient.checkedUsers.create({
          data: {
            checkedId: currentUser.id,
            wasCheckedId: secondUser.id,
          },
        });

        // second user has required fields to find user
        const { secondUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/return')
          .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
      });

      it('should return an empty object', async () => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { wrongUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/return')
          .set('Cookie', [`accessToken=${wrongUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when there is no such checked user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { secondUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/return')
          .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Not Found');
      });
    });

    describe('when user is already liked (=paired)', () => {
      let response: request.Response;

      beforeAll(async () => {
        await prismaClient.user.update({
          where: { id: secondUser.id },
          data: {
            pairs: { connect: { id: currentUser.id } },
          },
        });

        const { secondUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/return')
          .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Not Found');
      });
    });

    describe('when there is no access token', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).put('/users/return');
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });
  });

  describe('users/pairs (GET)', () => {
    beforeAll(async () => {
      currentUser = new UserDto(
        await prismaClient.user.update({
          where: { id: currentUser.id },
          data: { pairs: { connect: { id: secondUser.id } } },
        }),
      );
    });

    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .get('/users/pairs')
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should return a user', async () => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
          {
            id: secondUser.id,
            name: secondUser.name,
            description: secondUser.description,
            distance: secondUser.distance,
            interests: secondUser.interests,
            age: secondUser.age,
            pictures: secondUser.pictures,
          },
        ]);
      });
    });

    describe('when there is no pairs', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { secondUserAccessToken } = prepareAccessTokens();

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
        const { wrongUserAccessToken } = prepareAccessTokens();

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

  describe('users/pairs (PUT)', () => {
    beforeAll(async () => {
      currentUser = new UserDto(
        await prismaClient.user.update({
          where: { id: currentUser.id },
          data: { pairs: { connect: { id: secondUser.id } } },
        }),
      );
    });

    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/pairs/')
          .send({ userId: currentUser.id, userPairId: secondUser.id })
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should return an empty array of pairs', async () => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { wrongUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/pairs/')
          .send({ userId: 'wrong-id', userPairId: secondUser.id })
          .set('Cookie', [`accessToken=${wrongUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { currentUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/pairs/')
          .send({ userId: currentUser.id, userPairId: 'wrong-id' })
          .set('Cookie', [`accessToken=${currentUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when such pair does not exist', () => {
      let response: request.Response;

      beforeAll(async () => {
        const { secondUserAccessToken } = prepareAccessTokens();

        response = await request(httpServer)
          .put('/users/pairs/')
          .send({ userId: secondUser.id, userPairId: currentUser.id })
          .set('Cookie', [`accessToken=${secondUserAccessToken}`]);
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual(
          'Pair with such an id was not found',
        );
      });
    });

    describe('when there is no access token', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .put('/users/pairs/')
          .send({ userId: currentUser.id, userPairId: secondUser.id });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual('Unauthorized');
      });
    });
  });
});
