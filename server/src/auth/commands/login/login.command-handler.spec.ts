import { Test } from '@nestjs/testing';
import { userStub } from 'test/users/stubs';
import { UserData } from 'auth/auth.interface';
import { LOGIN_USER_DTO } from 'test/auth/values/auth.const.dto';
import { UsersService } from 'users/users.service';
import { TokensServiceMock, UsersServiceMock } from 'test/auth/mocks';
import { TokensService } from 'tokens/tokens.service';
import { userDataStub } from 'test/auth/stubs';
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

  let userData: UserData;

  beforeEach(async () => {
    jest.clearAllMocks();
    userData = await loginCommandHandler.execute(
      new LoginCommand(LOGIN_USER_DTO),
    );
  });

  it('should call usersService getUserByEmail', () => {
    expect(usersService.getUserByEmail).toBeCalledWith(LOGIN_USER_DTO.email);
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
