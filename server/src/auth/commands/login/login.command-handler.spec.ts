import { Test } from '@nestjs/testing';
import { userDtoStub } from 'users/test/stubs';
import { AuthDataReturn } from 'auth/auth.interface';
import { LOGIN_USER_DTO } from 'auth/test/values/auth.const.dto';
import { UsersService } from 'users/users.service';
import { TokensServiceMock, UsersServiceMock } from 'auth/test/mocks';
import { TokensService } from 'tokens/tokens.service';
import { userDataStub } from 'auth/test/stubs';
import { UsersModule } from 'users/users.module';
import { TokensModule } from 'tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { LoginCommandHandler } from './login.command-handler';
import { LoginCommand } from './login.command';

describe('when login is called', () => {
  let usersService: UsersService;
  let tokensService: TokensService;
  let loginCommandHandler: LoginCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LoginCommandHandler],
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

    usersService = moduleRef.get<UsersService>(UsersService);
    tokensService = moduleRef.get<TokensService>(TokensService);
    loginCommandHandler =
      moduleRef.get<LoginCommandHandler>(LoginCommandHandler);
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      usersService.getUserByEmail = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
        pairsCount: 5,
        password:
          '$2a$07$HQtmk3r9h1Gg1YiOLO67duUs3GPDg5.KKCtPSm/152gqIALiRvs6q',
        interests: [{ name: 'programming' }],
      });
      tokensService.generateTokens = jest.fn().mockResolvedValue({
        refreshToken: userDataStub().refreshToken,
        accessToken: userDataStub().data.accessToken,
      });
    });

    let data: AuthDataReturn;

    beforeEach(async () => {
      jest.clearAllMocks();
      data = await loginCommandHandler.execute(
        new LoginCommand(LOGIN_USER_DTO),
      );
    });

    it('should call usersService getUserByEmail', () => {
      expect(usersService.getUserByEmail).toBeCalledWith(LOGIN_USER_DTO.email);
    });

    it('should call tokensService generateTokens', () => {
      expect(tokensService.generateTokens).toBeCalledWith({
        id: userDtoStub().id,
        email: userDtoStub().email,
      });
    });

    it('should return userData', () => {
      expect(data).toEqual(userDataStub());
    });
  });
});
