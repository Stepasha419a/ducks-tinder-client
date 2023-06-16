import { Test } from '@nestjs/testing';
import { ConfigServiceMock, JwtServiceMock } from 'tokens/test/mocks';
import { tokensStub } from 'tokens/test/stubs';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ValidateAccessTokenCommand } from './validate-access-token.command';
import { ValidateAccessTokenCommandHandler } from './validate-access-token.command-handler';

describe('when validateAccessToken is called', () => {
  let jwtService: JwtService;
  let configService: ConfigService;

  let validateAccessTokenCommandHandler: ValidateAccessTokenCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ValidateAccessTokenCommandHandler],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        JwtModule.register({}),
      ],
    })
      .overrideProvider(JwtService)
      .useValue(JwtServiceMock())
      .overrideProvider(ConfigService)
      .useValue(ConfigServiceMock())
      .compile();

    jwtService = moduleRef.get<JwtService>(JwtService);
    configService = moduleRef.get<ConfigService>(ConfigService);
    validateAccessTokenCommandHandler =
      moduleRef.get<ValidateAccessTokenCommandHandler>(
        ValidateAccessTokenCommandHandler,
      );
  });

  let response;

  beforeEach(async () => {
    jest.clearAllMocks();

    configService.get = jest.fn().mockReturnValue('TOKENS_SECRET');
    jwtService.verify = jest.fn().mockResolvedValue({
      id: 'token-id',
      refreshToken: tokensStub().accessToken,
    });

    response = await validateAccessTokenCommandHandler.execute(
      new ValidateAccessTokenCommand(tokensStub().accessToken),
    );
  });

  it('should call jwtService verify', () => {
    expect(jwtService.verify).toBeCalledTimes(1);
    expect(jwtService.verify).toBeCalledWith(tokensStub().accessToken, {
      secret: 'TOKENS_SECRET',
    });
  });

  it('should return tokens', () => {
    expect(response).toEqual({
      id: 'token-id',
      refreshToken: tokensStub().accessToken,
    });
  });
});
