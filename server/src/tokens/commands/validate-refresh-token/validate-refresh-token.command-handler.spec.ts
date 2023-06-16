import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import {
  ConfigServiceMock,
  JwtServiceMock,
  TokensPrismaMock,
} from 'tokens/test/mocks';
import { tokensStub } from 'tokens/test/stubs';
import { ValidateRefreshTokenCommand } from './validate-refresh-token.command';
import { ValidateRefreshTokenCommandHandler } from './validate-refresh-token.command-handler';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('when validateRefreshToken is called', () => {
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let configService: ConfigService;

  let validateRefreshTokenCommandHandler: ValidateRefreshTokenCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ValidateRefreshTokenCommandHandler],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        PrismaModule,
        JwtModule.register({}),
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(TokensPrismaMock())
      .overrideProvider(JwtService)
      .useValue(JwtServiceMock())
      .overrideProvider(ConfigService)
      .useValue(ConfigServiceMock())
      .compile();

    jwtService = moduleRef.get<JwtService>(JwtService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    configService = moduleRef.get<ConfigService>(ConfigService);
    validateRefreshTokenCommandHandler =
      moduleRef.get<ValidateRefreshTokenCommandHandler>(
        ValidateRefreshTokenCommandHandler,
      );
  });

  let response;

  beforeEach(async () => {
    jest.clearAllMocks();

    configService.get = jest.fn().mockReturnValue('TOKENS_SECRET');
    prismaService.token.findUnique = jest.fn().mockResolvedValue({
      id: 'token-id',
      refreshToken: tokensStub().refreshToken,
    });
    jwtService.verify = jest.fn().mockResolvedValue({
      id: 'token-id',
      refreshToken: tokensStub().refreshToken,
    });

    response = await validateRefreshTokenCommandHandler.execute(
      new ValidateRefreshTokenCommand(tokensStub().refreshToken),
    );
  });

  it('should call prismaService token findUnique', () => {
    expect(prismaService.token.findUnique).toBeCalledTimes(1);
    expect(prismaService.token.findUnique).toHaveBeenCalledWith({
      where: { refreshToken: tokensStub().refreshToken },
    });
  });

  it('should call jwtService verify', () => {
    expect(jwtService.verify).toBeCalledTimes(1);
    expect(jwtService.verify).toBeCalledWith(tokensStub().refreshToken, {
      secret: 'TOKENS_SECRET',
    });
  });

  it('should return tokens', () => {
    expect(response).toEqual({
      id: 'token-id',
      refreshToken: tokensStub().refreshToken,
    });
  });
});
