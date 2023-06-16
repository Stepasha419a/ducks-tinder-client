import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { TokensPrismaMock } from 'tokens/test/mocks';
import { RemoveTokenCommandHandler } from './remove-token.command-handler';
import { RemoveTokenCommand } from './remove-token.command';
import { tokensStub } from 'tokens/test/stubs';

describe('when generateTokens is called', () => {
  let prismaService: PrismaService;

  let removeTokenCommandHandler: RemoveTokenCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RemoveTokenCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(TokensPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    removeTokenCommandHandler = moduleRef.get<RemoveTokenCommandHandler>(
      RemoveTokenCommandHandler,
    );
  });

  let response;

  beforeEach(async () => {
    jest.clearAllMocks();

    prismaService.token.findUnique = jest.fn().mockResolvedValue({
      id: 'token-id',
      refreshToken: tokensStub().refreshToken,
    });

    prismaService.token.delete = jest.fn().mockResolvedValue({
      id: 'token-id',
      refreshToken: tokensStub().refreshToken,
    });

    response = await removeTokenCommandHandler.execute(
      new RemoveTokenCommand(tokensStub().refreshToken),
    );
  });

  it('should call prismaService token findUnique', () => {
    expect(prismaService.token.findUnique).toBeCalledTimes(1);
    expect(prismaService.token.findUnique).toHaveBeenCalledWith({
      where: { refreshToken: tokensStub().refreshToken },
    });
  });

  it('should call prismaService token delete', () => {
    expect(prismaService.token.delete).toBeCalledTimes(1);
    expect(prismaService.token.delete).toHaveBeenCalledWith({
      where: { refreshToken: tokensStub().refreshToken },
    });
  });

  it('should return tokens', () => {
    expect(response).toEqual({
      id: 'token-id',
      refreshToken: tokensStub().refreshToken,
    });
  });
});
