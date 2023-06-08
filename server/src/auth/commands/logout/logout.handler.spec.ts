import { Test } from '@nestjs/testing';
import { TokensServiceMock } from 'test/auth/mocks';
import { TokensService } from 'tokens/tokens.service';
import { userDataStub } from 'test/auth/stubs';
import { UsersModule } from 'users/users.module';
import { TokensModule } from 'tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { LogoutHandler } from './logout.handler';
import { LogoutCommand } from './logout.command';

describe('when logout is called', () => {
  let tokensService: TokensService;
  let logoutHandler: LogoutHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LogoutHandler],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        UsersModule,
        TokensModule,
      ],
    })
      .overrideProvider(TokensService)
      .useValue(TokensServiceMock())
      .compile();

    tokensService = moduleRef.get<TokensService>(TokensService);
    logoutHandler = moduleRef.get<LogoutHandler>(LogoutHandler);
  });

  let response;

  beforeEach(async () => {
    jest.clearAllMocks();
    response = await logoutHandler.execute(
      new LogoutCommand(userDataStub().refreshToken),
    );
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
