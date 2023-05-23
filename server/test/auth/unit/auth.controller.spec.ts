import { Test } from '@nestjs/testing';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { AccessTokenGuard } from 'common/guards';
import { AuthServiceMock } from '../mocks/auth.service.mock';
import { UserDto } from 'users/dto';
import { CREATE_USER_DTO, LOGIN_USER_DTO } from '../values/auth.const.dto';
import { Response } from 'express';
import { RequestMock, ResponseMock } from '../mocks';
import { userStub } from '../../users/stubs';
import { userDataStub } from '../stubs';
import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from 'tokens/tokens.constants';

describe('auth-controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAccessTokenGuard = jest.fn().mockReturnValue(true);
  const responseMock = ResponseMock();
  const requestMock = RequestMock();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideGuard(AccessTokenGuard)
      .useValue(mockAccessTokenGuard)
      .overrideProvider(AuthService)
      .useValue(AuthServiceMock())
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when controller is ready', () => {
    it('should be defined', () => {
      expect(authController).toBeDefined();
    });
  });

  describe('when registration is called', () => {
    let user: Response<UserDto>;

    beforeEach(async () => {
      user = await authController.registration(responseMock, CREATE_USER_DTO);
    });

    it('should call authService', () => {
      expect(authService.registration).toBeCalledWith(CREATE_USER_DTO);
    });

    it('should call response cookie', () => {
      expect(responseMock.cookie).toBeCalledTimes(2);
      expect(responseMock.cookie).toHaveBeenNthCalledWith(
        1,
        'refreshToken',
        userDataStub().refreshToken,
        {
          maxAge: REFRESH_TOKEN_TIME,
          httpOnly: true,
        },
      );
      expect(responseMock.cookie).toHaveBeenNthCalledWith(
        2,
        'accessToken',
        userDataStub().accessToken,
        {
          maxAge: ACCESS_TOKEN_TIME,
          httpOnly: true,
        },
      );
    });

    it('should call response json', () => {
      expect(responseMock.json).toBeCalledWith(userDataStub().user);
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when login is called', () => {
    let user: Response<UserDto>;

    beforeEach(async () => {
      user = await authController.login(responseMock, LOGIN_USER_DTO);
    });

    it('should call authService', () => {
      expect(authService.login).toBeCalledWith(LOGIN_USER_DTO);
    });

    it('should call response cookie', () => {
      expect(responseMock.cookie).toBeCalledTimes(2);
      expect(responseMock.cookie).toHaveBeenNthCalledWith(
        1,
        'refreshToken',
        userDataStub().refreshToken,
        {
          maxAge: REFRESH_TOKEN_TIME,
          httpOnly: true,
        },
      );
      expect(responseMock.cookie).toHaveBeenNthCalledWith(
        2,
        'accessToken',
        userDataStub().accessToken,
        {
          maxAge: ACCESS_TOKEN_TIME,
          httpOnly: true,
        },
      );
    });

    it('should call response json', () => {
      expect(responseMock.json).toBeCalledWith(userDataStub().user);
    });

    it('should return a user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when logout is called', () => {
    let response: Response;

    beforeEach(async () => {
      response = await authController.logout(requestMock, responseMock);
    });

    it('should call authService', () => {
      expect(authService.logout).toBeCalledWith(userDataStub().refreshToken);
    });

    it('should call response clearCookie', () => {
      expect(responseMock.clearCookie).toBeCalledTimes(2);
      expect(responseMock.clearCookie).toHaveBeenNthCalledWith(
        1,
        'refreshToken',
      );
      expect(responseMock.clearCookie).toHaveBeenNthCalledWith(
        2,
        'accessToken',
      );
    });

    it('should call response end', () => {
      expect(responseMock.end).toBeCalledTimes(1);
    });

    it('should return a response', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when refresh is called', () => {
    let user: Response<UserDto>;

    beforeEach(async () => {
      user = await authController.refresh(requestMock, responseMock);
    });

    it('should call authService', () => {
      expect(authService.refresh).toBeCalledWith(userDataStub().refreshToken);
    });

    it('should call response cookie', () => {
      expect(responseMock.cookie).toBeCalledTimes(2);
      expect(responseMock.cookie).toHaveBeenNthCalledWith(
        1,
        'refreshToken',
        userDataStub().refreshToken,
        {
          maxAge: REFRESH_TOKEN_TIME,
          httpOnly: true,
        },
      );
      expect(responseMock.cookie).toHaveBeenNthCalledWith(
        2,
        'accessToken',
        userDataStub().accessToken,
        {
          maxAge: ACCESS_TOKEN_TIME,
          httpOnly: true,
        },
      );
    });

    it('should call response json', () => {
      expect(responseMock.json).toBeCalledWith(userDataStub().user);
    });

    it('should return a response', () => {
      expect(user).toEqual(userDataStub().user);
    });
  });
});
