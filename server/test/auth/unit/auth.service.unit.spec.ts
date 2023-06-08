import { Test } from '@nestjs/testing';
import { UserData } from 'auth/auth.interface';
import { AuthService } from 'auth/auth.service';
import { TokensModule } from 'tokens/tokens.module';
import { TokensService } from 'tokens/tokens.service';
import { UsersModule } from 'users/users.module';
import { UsersService } from 'users/users.service';
import { LOGIN_USER_DTO } from '../values/auth.const.dto';
import { userDataStub } from '../stubs';
import { CommandBusMock, TokensServiceMock, UsersServiceMock } from '../mocks';
import { ConfigModule } from '@nestjs/config';
import { userStub } from 'test/users/stubs';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { CREATE_USER_DTO } from 'test/users/values/users.const.dto';
import { LoginCommand, RegisterCommand } from 'auth/commands';

describe('auth-service', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let tokensService: TokensService;
  let commandBus: CommandBus;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        CqrsModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        UsersModule,
        TokensModule,
      ],
    })
      .overrideProvider(UsersService)
      .useValue(UsersServiceMock())
      .overrideProvider(TokensService)
      .useValue(TokensServiceMock())
      .overrideProvider(CommandBus)
      .useValue(CommandBusMock())
      .compile();

    authService = moduleRef.get<AuthService>(AuthService);
    usersService = moduleRef.get<UsersService>(UsersService);
    tokensService = moduleRef.get<TokensService>(TokensService);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when service is ready', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
    });
  });

  describe('when registration is called', () => {
    let userData: UserData;

    beforeAll(() => {
      jest.clearAllMocks();
      commandBus.execute = jest.fn().mockResolvedValue(userDataStub());

      usersService.getByEmail = jest.fn().mockResolvedValue(undefined);
    });

    afterAll(() => {
      usersService.getByEmail = jest.fn().mockResolvedValue({
        ...userStub(),
        _count: { pairFor: 0 },
        password:
          '$2a$07$HQtmk3r9h1Gg1YiOLO67duUs3GPDg5.KKCtPSm/152gqIALiRvs6q',
      });
    });

    beforeEach(async () => {
      userData = await authService.registration(CREATE_USER_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new RegisterCommand(CREATE_USER_DTO),
      );
    });

    it('should return user data', async () => {
      expect(userData).toEqual(userDataStub());
    });
  });

  describe('when login is called', () => {
    let userData: UserData;

    beforeAll(() => {
      jest.clearAllMocks();
      commandBus.execute = jest.fn().mockResolvedValue(userDataStub());
    });

    beforeEach(async () => {
      userData = await authService.login(LOGIN_USER_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new LoginCommand(LOGIN_USER_DTO),
      );
    });

    it('should return user data', async () => {
      expect(userData).toEqual(userDataStub());
    });
  });

  describe('when logout is called', () => {
    let response;

    beforeEach(async () => {
      response = await authService.logout(userDataStub().refreshToken);
    });

    it('should call tokensService removeToken', () => {
      expect(tokensService.removeToken).toBeCalledWith(
        userDataStub().refreshToken,
      );
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when refresh is called', () => {
    let userData: UserData;

    beforeEach(async () => {
      userData = await authService.refresh(userDataStub().refreshToken);
    });

    it('should call tokensService validateRefreshToken', () => {
      expect(tokensService.validateRefreshToken).toBeCalledWith(
        userDataStub().refreshToken,
      );
    });

    it('should call usersService getOne', () => {
      expect(usersService.getOne).toBeCalledWith(userStub().id);
    });

    it('should call tokensService generateTokens', () => {
      expect(tokensService.generateTokens).toBeCalledWith({
        id: userStub().id,
        email: userStub().email,
      });
    });

    it('should return userData', () => {
      expect(userData).toEqual(userDataStub());
    });
  });
});
