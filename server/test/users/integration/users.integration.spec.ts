import * as request from 'supertest';
import { NestApplication } from '@nestjs/core';
import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import { AuthGuard } from 'auth/auth.guard';
import prismaClient from '../../prisma-client/prisma-client';
import { newUserStub } from '../stubs';
import {
  UPDATE_USER_DTO,
  USER_SORTS_DTO,
  DELETE_PICTURE_DTO,
  MIX_PICTURES_DTO,
} from '../values/users-const.dto';
import * as path from 'path';
import { UserDto } from 'users/dto';
import { UsersSelector } from 'users/utils';

describe('UsersController', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

  let users: UserDto[];
  let currentUser: UserDto;

  const mockAuthGuard = jest.fn().mockReturnValue(true);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    await prismaClient.$connect();

    await prismaClient.user.createMany({
      data: [
        { email: '123@gmail.com', password: '123123', name: 'Jason' },
        {
          email: '456@gmail.com',
          password: '456456',
          name: 'Loren',
          age: 20,
          distance: 50,
          preferAgeFrom: 18,
          preferAgeTo: 28,
          preferSex: 'male',
          sex: 'female',
        },
      ],
    });

    await prismaClient.user.update({
      where: { email: '456@gmail.com' },
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
      include: UsersSelector.selectUser(),
    }),
      await prismaClient.interest.createMany({
        data: [{ name: 'traveling' }, { name: 'ski' }],
      });

    currentUser = new UserDto(
      await prismaClient.user.findUnique({
        where: { email: '123@gmail.com' },
        include: UsersSelector.selectUser(),
      }),
    );

    users = (
      await prismaClient.user.findMany({
        include: UsersSelector.selectUser(),
      })
    ).map((user) => new UserDto(user));

    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    currentUser = new UserDto(
      await prismaClient.user.findUnique({
        where: { id: users[0].id },
        include: UsersSelector.selectUser(),
      }),
    );
  });

  afterAll(async () => {
    await app.close();
    await prismaClient.$transaction([
      prismaClient.picture.deleteMany(),
      prismaClient.user.deleteMany(),
      prismaClient.interest.deleteMany(),
    ]);
    await prismaClient.$disconnect();
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
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          ...newUserStub(),
          id: currentUser.id,
          email: UPDATE_USER_DTO.email,
          name: UPDATE_USER_DTO.name,
          interests: [
            { name: UPDATE_USER_DTO.interests[0] },
            { name: UPDATE_USER_DTO.interests[1] },
          ],
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
          id: users[1].id,
          age: users[1].age,
          description: users[1].description,
          distance: users[1].distance,
          name: users[1].name,
          pictures: users[1].pictures,
          interests: [],
        });
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .post('/users/sorted')
          .send({ ...USER_SORTS_DTO, userIds: [users[0].id, users[1].id] });
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
          .field('userId', users[1].id)
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
          .send({ ...MIX_PICTURES_DTO, userId: users[1].id });
      });

      it('should return a user', async () => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          ...users[1],
          pictures: [
            { ...users[1].pictures[1], order: 0 },
            { ...users[1].pictures[0], order: 1 },
            ...users[1].pictures.slice(2),
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
          .send({ mixOrder: 10, withOrder: 1, userId: users[1].id });
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
          .send({ mixOrder: 1, withOrder: 10, userId: users[1].id });
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
          .send({ userId: currentUser.id, userPairId: users[1].id });
      });

      it('should return a user', async () => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
          {
            id: users[1].id,
            name: users[1].name,
            description: users[1].description,
            distance: users[1].distance,
            interests: users[1].interests,
            age: users[1].age,
            pictures: users[1].pictures,
          },
        ]);
      });
    });

    describe('when there is no such user', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .post('/users/pairs')
          .send({ userId: 'wrong-id', userPairId: users[1].id });
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
        response = await request(httpServer)
          .post('/users/pairs/')
          .send({ userId: currentUser.id, userPairId: users[1].id });
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
            id: users[1].id,
            name: users[1].name,
            description: users[1].description,
            distance: users[1].distance,
            interests: users[1].interests,
            age: users[1].age,
            pictures: users[1].pictures,
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
    describe('when it is called correctly', () => {
      let response: request.Response;

      beforeAll(async () => {
        response = await request(httpServer)
          .put('/users/pairs/')
          .send({ userId: currentUser.id, userPairId: users[1].id });
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
          .send({ userId: 'wrong-id', userPairId: users[1].id });
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
          .send({ userId: users[1].id, userPairId: currentUser.id });
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
