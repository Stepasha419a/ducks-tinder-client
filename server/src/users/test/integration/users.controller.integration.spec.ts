import * as request from 'supertest';
import { Connection } from 'mongoose';
import { NestApplication } from '@nestjs/core';
import { HttpServer } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { AuthGuard } from '../../../auth/auth.guard';
import { SavePictureDto } from '../../../users/dto/save-picture.dto';
import { UserSortsDto } from '../../../users/dto/user-sorts.dto';
import { DeletePictureDto } from '../../../users/dto/delete-picture.dto';
import { userStub } from '../stubs';
import * as path from 'path';

describe('UsersController', () => {
  let dbConnection: Connection;
  let httpServer: HttpServer;
  let app: NestApplication;

  let userId: string;

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

    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await dbConnection.collection('users').deleteMany({});
    await app.close();
  });

  describe('users/:id (GET)', () => {
    it('should return a user', async () => {
      const result = await dbConnection
        .collection('users')
        .insertOne({ ...userStub() });
      userId = result.insertedId.toString();

      const response = await request(httpServer).get(`/users/${userId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...userStub(), id: userId });
    });
  });

  describe('users/sorted (POST)', () => {
    const user = userStub();
    const userSortsDto: UserSortsDto = {
      distance: user.partnerSettings.distance + 10,
      onlyNear: false,
      age: user.age,
      preferAge: { from: user.age - 2, to: user.age + 2 },
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
  });

  describe('users/picture (POST)', () => {
    const user = userStub();
    const savePictureDto: SavePictureDto = {
      userId,
      setting: 'avatar',
    };

    it('should return an updated user with updated pictures field', async () => {
      const result = await dbConnection
        .collection('users')
        .findOne({ email: userStub().email });
      userId = result.id.toString();

      const response = await request(httpServer)
        .post('/users/picture')
        .field('userId', userId)
        .field('setting', savePictureDto.setting)
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
  });

  describe('users/picture (PUT)', () => {
    const user = userStub();

    it('should return an updated user with updated pictures field', async () => {
      const result = await dbConnection
        .collection('users')
        .findOne({ email: userStub().email });
      userId = result.id.toString();

      const deletePictureDto: DeletePictureDto = {
        userId,
        pictureName: result.pictures.avatar,
        setting: 'avatar',
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
  });
});
