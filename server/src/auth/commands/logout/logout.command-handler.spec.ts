import { Test } from '@nestjs/testing';
import { TokensServiceMock } from 'auth/test/mocks';
import { TokensService } from 'tokens/tokens.service';
import { userDataStub } from 'auth/test/stubs';
import { UsersModule } from 'users/users.module';
import { TokensModule } from 'tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { LogoutCommandHandler } from './logout.command-handler';
import { LogoutCommand } from './logout.command';

describe('when logout is called', () => {
  let tokensService: TokensService;
  let logoutCommandHandler: LogoutCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LogoutCommandHandler],
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
    logoutCommandHandler =
      moduleRef.get<LogoutCommandHandler>(LogoutCommandHandler);
  });

  let response;

  beforeEach(async () => {
    jest.clearAllMocks();
    response = await logoutCommandHandler.execute(
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
