import * as request from 'supertest';
import { NestApplication } from '@nestjs/core';
import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import { AuthGuard } from 'auth/auth.guard';
import prismaClient from '../../prisma-client/prisma-client';
import { newUserStub } from '../stubs';
import { User } from '@prisma/client';
import { UPDATE_USER_DTO } from '../values/users-const.dto';

describe('UsersController', () => {
  let httpServer: HttpServer;
  let app: NestApplication;

  let users: User[];
  let currentUser: User;

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
        { email: '456@gmail.com', password: '456456', name: 'Loren' },
      ],
    });

    await prismaClient.interest.createMany({
      data: [{ name: 'traveling' }, { name: 'ski' }],
    });

    users = await prismaClient.user.findMany();
    currentUser = users[0];

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
    await prismaClient.$transaction([
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
          .patch(`/users/wrong-id`)
          .send({ name: 'William' });
      });

      it('should throw an error', async () => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual('Such user was not found');
      });
    });
  });

  /* describe('users/sorted (POST)', () => {
    const user = userStub();
    const userSortsDto: UserSortsDto = {
      distance: user.distance + 10,
      onlyNear: false,
      age: user.age,
      preferAgeFrom: user.age - 2,
      preferAgeTo: user.age + 2,
      sex: 'female',
      preferSex: 'male',
      userIds: [],
    };

    it('should return a sorted user', async () => {
      const response = await request(httpServer)
        .post('/users/sorted')
        .send(userSortsDto);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...user, id: userId });
    });
  }); */

  /* describe('users/picture (POST)', () => {
    const user = userStub();
    const savePictureDto: SavePictureDto = {
      userId,
    };

    it('should return an updated user with updated pictures field', async () => {
      const result = await dbConnection
        .collection('users')
        .findOne({ email: userStub().email });
      userId = result.id.toString();

      const response = await request(httpServer)
        .post('/users/picture')
        .field('userId', savePictureDto.userId)
        .attach(
          'picture',
          path.resolve(__dirname, '..', 'stubs', 'test-image.jpg'),
        );

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        ...user,
        id: userId.toString(),
        pictures: { ...user.pictures, avatar: response.body.pictures.avatar },
      });
    });
  }); */

  /* describe('users/picture (PUT)', () => {
    const user = userStub();

    it('should return an updated user with updated pictures field', async () => {
      const result = await dbConnection
        .collection('users')
        .findOne({ email: userStub().email });
      userId = result.id.toString();

      const deletePictureDto: DeletePictureDto = {
        userId,
        order: 0,
      };

      const response = await request(httpServer)
        .put('/users/picture')
        .send(deletePictureDto);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...user,
        id: userId.toString(),
        pictures: { ...user.pictures, avatar: '' },
      });
    });
  }); */
});
