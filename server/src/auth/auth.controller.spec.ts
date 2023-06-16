import { Test } from '@nestjs/testing';
import { AuthController } from 'auth/auth.controller';
import { AccessTokenGuard } from 'common/guards';
import { UserDto } from 'users/dto';
import {
  CREATE_USER_DTO,
  LOGIN_USER_DTO,
} from 'auth/test/values/auth.const.dto';
import { Response } from 'express';
import { CommandBusMock, RequestMock, ResponseMock } from 'auth/test/mocks';
import { userStub } from 'users/test/stubs';
import { userDataStub } from 'auth/test/stubs';
import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from 'tokens/tokens.constants';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import {
  LoginCommand,
  LogoutCommand,
  RefreshCommand,
  RegisterCommand,
} from 'auth/commands';

describe('auth-controller', () => {
  let authController: AuthController;
  let commandBus: CommandBus;

  const mockAccessTokenGuard = jest.fn().mockReturnValue(true);
  const responseMock = ResponseMock();
  const requestMock = RequestMock();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [CqrsModule],
    })
      .overrideGuard(AccessTokenGuard)
      .useValue(mockAccessTokenGuard)
      .overrideProvider(CommandBus)
      .useValue(CommandBusMock())
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
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

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(userDataStub());
    });

    beforeEach(async () => {
      user = await authController.registration(responseMock, CREATE_USER_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new RegisterCommand(CREATE_USER_DTO),
      );
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

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(userDataStub());
    });

    beforeEach(async () => {
      user = await authController.login(responseMock, LOGIN_USER_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new LoginCommand(LOGIN_USER_DTO),
      );
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

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(undefined);
    });

    beforeEach(async () => {
      response = await authController.logout(requestMock, responseMock);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new LogoutCommand(userDataStub().refreshToken),
      );
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

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when refresh is called', () => {
    let user: Response<UserDto>;

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(userDataStub());
    });

    beforeEach(async () => {
      user = await authController.refresh(requestMock, responseMock);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new RefreshCommand(userDataStub().refreshToken),
      );
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
