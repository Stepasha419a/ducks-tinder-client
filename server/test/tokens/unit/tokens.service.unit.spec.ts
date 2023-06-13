import { Test } from '@nestjs/testing';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { USER_TOKEN_DTO } from '../values/tokens.const.dto';
import { TokensService } from 'tokens/tokens.service';
import {
  GenerateTokensCommand,
  RemoveTokenCommand,
  ValidateRefreshTokenCommand,
} from 'tokens/commands';
import { tokensStub } from '../stubs';

describe('users-service', () => {
  let tokensService: TokensService;
  let commandBus: CommandBus;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TokensService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        CqrsModule,
        PrismaModule,
        JwtModule.register({}),
      ],
    }).compile();

    tokensService = moduleRef.get<TokensService>(TokensService);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when service is ready', () => {
    it('should be defined', () => {
      expect(tokensService).toBeDefined();
    });
  });

  describe('when generate tokens is called', () => {
    let tokens;

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(tokensStub());
    });

    beforeEach(async () => {
      tokens = await tokensService.generateTokens(USER_TOKEN_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new GenerateTokensCommand(USER_TOKEN_DTO),
      );
    });

    it('should return tokens', async () => {
      expect(tokens).toEqual(tokensStub());
    });
  });

  describe('when remove token is called', () => {
    let response;

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(tokensStub());
    });

    beforeEach(async () => {
      response = await tokensService.removeToken(tokensStub().refreshToken);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new RemoveTokenCommand(tokensStub().refreshToken),
      );
    });

    it('should return payload data (as tokensStub to check)', async () => {
      expect(response).toEqual(tokensStub());
    });
  });

  describe('when validate refresh token is called', () => {
    let response;

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(tokensStub());
    });

    beforeEach(async () => {
      response = await tokensService.validateRefreshToken(
        tokensStub().refreshToken,
      );
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new ValidateRefreshTokenCommand(tokensStub().refreshToken),
      );
    });

    it('should return payload data (as tokensStub to check)', async () => {
      expect(response).toEqual(tokensStub());
    });
  });
});
