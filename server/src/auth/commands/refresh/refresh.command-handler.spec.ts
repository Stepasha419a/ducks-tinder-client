import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from 'users/users.service';
import { UsersModule } from 'users/users.module';
import { TokensService } from 'tokens/tokens.service';
import { TokensModule } from 'tokens/tokens.module';
import { TokensServiceMock, UsersServiceMock } from 'test/auth/mocks';
import { UserData } from 'auth/auth.interface';
import { RefreshCommand } from './refresh.command';
import { userDataStub } from 'test/auth/stubs';
import { userStub } from 'test/users/stubs';
import { RefreshCommandHandler } from './refresh.command-handler';

describe('when refresh is called', () => {
  let tokensService: TokensService;
  let usersService: UsersService;
  let refreshCommandHandler: RefreshCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RefreshCommandHandler],
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

    tokensService = moduleRef.get<TokensService>(TokensService);
    usersService = moduleRef.get<UsersService>(UsersService);
    refreshCommandHandler = moduleRef.get<RefreshCommandHandler>(
      RefreshCommandHandler,
    );
  });

  let userData: UserData;

  beforeEach(async () => {
    jest.clearAllMocks();
    userData = await refreshCommandHandler.execute(
      new RefreshCommand(userDataStub().refreshToken),
    );
  });

  it('should call tokensService validateRefreshToken', () => {
    expect(tokensService.validateRefreshToken).toBeCalledWith(
      userDataStub().refreshToken,
    );
  });

  it('should call usersService getUser', () => {
    expect(usersService.getUser).toBeCalledWith(userStub().id);
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
