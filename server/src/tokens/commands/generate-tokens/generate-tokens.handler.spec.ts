import { Test } from '@nestjs/testing';
import { GenerateTokensHandler } from './generate-tokens.handler';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GenerateTokensCommand } from './generate-tokens.command';
import { USER_TOKEN_DTO } from 'test/tokens/values/tokens.const.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import {
  ConfigServiceMock,
  JwtServiceMock,
  TokensPrismaMock,
} from 'test/tokens/mocks';

describe('when generateTokens is called', () => {
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let configService: ConfigService;

  let generateTokensHandler: GenerateTokensHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GenerateTokensHandler],
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

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    configService = moduleRef.get<ConfigService>(ConfigService);
    generateTokensHandler = moduleRef.get<GenerateTokensHandler>(
      GenerateTokensHandler,
    );
  });

  let tokens;

  beforeEach(async () => {
    jest.clearAllMocks();

    configService.get = jest.fn().mockReturnValue('TOKENS_SECRET');
    jwtService.sign = jest.fn().mockReturnValue('TOKEN');

    tokens = await generateTokensHandler.execute(
      new GenerateTokensCommand(USER_TOKEN_DTO),
    );
  });

  it('should call jwtService sign', () => {
    expect(jwtService.sign).toBeCalledTimes(2);
    expect(jwtService.sign).toHaveBeenNthCalledWith(1, USER_TOKEN_DTO, {
      expiresIn: '15m',
      secret: 'TOKENS_SECRET',
    });
    expect(jwtService.sign).toHaveBeenNthCalledWith(2, USER_TOKEN_DTO, {
      expiresIn: '7d',
      secret: 'TOKENS_SECRET',
    });
  });

  it('should call prismaService token findUnique', () => {
    expect(prismaService.token.findUnique).toBeCalledTimes(1);
    expect(prismaService.token.findUnique).toHaveBeenCalledWith({
      where: { id: USER_TOKEN_DTO.id },
    });
  });

  it('should call prismaService token update', () => {
    expect(prismaService.token.create).toBeCalledTimes(1);
    expect(prismaService.token.create).toHaveBeenCalledWith({
      data: { id: USER_TOKEN_DTO.id, refreshToken: 'TOKEN' },
    });
  });

  it('should return tokens', () => {
    expect(tokens).toEqual({ accessToken: 'TOKEN', refreshToken: 'TOKEN' });
  });
});
