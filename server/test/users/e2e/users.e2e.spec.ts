import * as request from 'supertest';
import { NestApplication } from '@nestjs/core';
import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import prismaClient from 'test/prisma-client';
import { newUserStub } from '../stubs';
import {
  UPDATE_USER_DTO,
  USER_SORTS_DTO,
  DELETE_PICTURE_DTO,
  MIX_PICTURES_DTO,
} from '../values/users.const.dto';
import * as path from 'path';
import { UserDto } from 'users/dto';
import { AccessTokenGuard } from 'common/guards';
import { prepareAfter, prepareBefore } from './preparations';

describe('users-e2e', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

  let currentUser: UserDto;
  let secondUser: UserDto;

  const mockAccessTokenGuard = {
    canActivate: jest.fn().mockReturnValue(true),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AccessTokenGuard)
      .useValue(mockAccessTokenGuard)
      .compile();

    app = moduleRef.createNestApplication();
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

  describe('users/:id (PATCH)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .patch(`/users/${currentUser.id}`)
          .send({
            ...UPDATE_USER_DTO,
            interests: [
              ...UPDATE_USER_DTO.interests,
              'wrong-interest-1',
              'wrong-interest-2',
            ],
          });
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
        response = await request(httpServer)
          .patch('/users/wrong-id')
          .send({ name: 'William' });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });
  });

  describe('users/sorted (POST)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .post('/users/sorted')
          .send(USER_SORTS_DTO);
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
        response = await request(httpServer)
          .post('/users/sorted')
          .send({
            ...USER_SORTS_DTO,
            userIds: [currentUser.id, secondUser.id],
          });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual(
          'Such user was not found, try to change settings',
        );
      });
    });
  });

  describe('users/picture (POST)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .post('/users/picture')
          .field('userId', currentUser.id)
          .attach(
            'picture',
            path.resolve(__dirname, '..', 'stubs', 'test-image.jpg'),
          );
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
        response = await request(httpServer)
          .post('/users/picture')
          .field('userId', 'wrong-id')
          .attach(
            'picture',
            path.resolve(__dirname, '..', 'stubs', 'test-image.jpg'),
          );
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when it is max pictures count', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .post('/users/picture')
          .field('userId', secondUser.id)
          .attach(
            'picture',
            path.resolve(__dirname, '..', 'stubs', 'test-image.jpg'),
          );
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('You have max pictures count');
      });
    });
  });

  describe('users/picture (PUT)', () => {
    beforeAll(async () => {
      currentUser = (
        await request(httpServer)
          .post('/users/picture')
          .field('userId', currentUser.id)
          .attach(
            'picture',
            path.resolve(__dirname, '..', 'stubs', 'test-image.jpg'),
          )
      ).body;
    });

    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .put('/users/picture')
          .send({ ...DELETE_PICTURE_DTO, userId: currentUser.id });
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
        response = await request(httpServer)
          .put('/users/picture')
          .send({ order: 1, userId: currentUser.id });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Not Found');
      });
    });
  });

  describe('users/picture/mix (PUT)', () => {
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .put('/users/picture/mix')
          .send({ ...MIX_PICTURES_DTO, userId: secondUser.id });
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
        response = await request(httpServer)
          .put('/users/picture/mix')
          .send({ ...MIX_PICTURES_DTO, userId: 'wrong-id' });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when there is no such picture', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .put('/users/picture/mix')
          .send({ mixOrder: 10, withOrder: 1, userId: secondUser.id });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Not Found');
      });
    });

    describe('when there is no such picture', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .put('/users/picture/mix')
          .send({ mixOrder: 1, withOrder: 10, userId: secondUser.id });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Not Found');
      });
    });
  });

  describe('users/pairs (POST)', () => {
    describe('when users/pairs/:id (GET) is called to check empty array of pairs', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).get(
          `/users/pairs/${currentUser.id}`,
        );
      });

      it('should return an empty array of pairs', async () => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });
    });

    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .post('/users/pairs')
          .send({ userId: currentUser.id, userPairId: secondUser.id });
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

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .post('/users/pairs')
          .send({ userId: 'wrong-id', userPairId: secondUser.id });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .post('/users/pairs')
          .send({ userId: currentUser.id, userPairId: 'wrong-id' });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when they are already paired => already exist', () => {
      let response: request.Response;

      beforeAll(async () => {
        await prismaClient.user.update({
          where: { id: currentUser.id },
          data: { pairs: { connect: { id: secondUser.id } } },
        });
        response = await request(httpServer)
          .post('/users/pairs/')
          .send({ userId: currentUser.id, userPairId: secondUser.id });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual(
          'Pair with such an id already exists',
        );
      });
    });
  });

  describe('users/pairs/:id (GET)', () => {
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
        response = await request(httpServer).get(
          `/users/pairs/${currentUser.id}`,
        );
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

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer).get('/users/pairs/wrong-id');
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
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
        response = await request(httpServer)
          .put('/users/pairs/')
          .send({ userId: currentUser.id, userPairId: secondUser.id });
      });

      it('should return an empty array of pairs', async () => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .put('/users/pairs/')
          .send({ userId: 'wrong-id', userPairId: secondUser.id });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .put('/users/pairs/')
          .send({ userId: currentUser.id, userPairId: 'wrong-id' });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });

    describe('when such pair does not exist', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .put('/users/pairs/')
          .send({ userId: secondUser.id, userPairId: currentUser.id });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual(
          'Pair with such an id was not found',
        );
      });
    });
  });
});
