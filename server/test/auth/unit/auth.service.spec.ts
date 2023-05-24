import { Test } from '@nestjs/testing';
import { UserData } from 'auth/auth.interface';
import { AuthService } from 'auth/auth.service';
import { TokensModule } from 'tokens/tokens.module';
import { TokensService } from 'tokens/tokens.service';
import { UsersModule } from 'users/users.module';
import { UsersService } from 'users/users.service';
import { CREATE_USER_DTO, LOGIN_USER_DTO } from '../values/auth.const.dto';
import { userDataStub } from '../stubs';
import { TokensServiceMock, UsersServiceMock } from '../mocks';
import { ConfigModule } from '@nestjs/config';
import { userStub } from '../../users/stubs';

describe('auth-service', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let tokensService: TokensService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
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
      .compile();

    authService = moduleRef.get<AuthService>(AuthService);
    usersService = moduleRef.get<UsersService>(UsersService);
    tokensService = moduleRef.get<TokensService>(TokensService);
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

    beforeEach(async () => {
      userData = await authService.registration(CREATE_USER_DTO);
    });

    afterAll(() => {
      // then it should always return an existing user
      usersService.getByEmail = jest.fn().mockResolvedValue({
        ...userStub(),
        _count: { pairFor: 0 },
        password:
          '$2a$07$HQtmk3r9h1Gg1YiOLO67duUs3GPDg5.KKCtPSm/152gqIALiRvs6q',
      });
    });

    it('should call usersService getByEmail', () => {
      expect(usersService.getByEmail).toBeCalledWith(CREATE_USER_DTO.email);
    });

    it('should call usersService create', () => {
      // password is custom with bcrypt
      expect(usersService.create).toBeCalledTimes(1);
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

  describe('when login is called', () => {
    let userData: UserData;

    beforeEach(async () => {
      userData = await authService.login(LOGIN_USER_DTO);
    });

    it('should call usersService getByEmail', () => {
      expect(usersService.getByEmail).toBeCalledWith(LOGIN_USER_DTO.email);
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
