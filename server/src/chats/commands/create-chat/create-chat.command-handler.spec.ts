import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { userStub } from 'users/test/stubs';
import { CreateChatCommand } from './create-chat.command';
import { CreateChatCommandHandler } from './create-chat.command-handler';
import { ChatsPrismaMock } from 'chats/test/mocks';

describe('when accept pair is called', () => {
  let prismaService: PrismaService;
  let createChatCommandHandler: CreateChatCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CreateChatCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(ChatsPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    createChatCommandHandler = moduleRef.get<CreateChatCommandHandler>(
      CreateChatCommandHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest.fn().mockResolvedValue(undefined);
    });

    let response;
    const userPairId = '34545656';
    const memberIds = [userStub().id, userPairId];

    beforeEach(async () => {
      jest.clearAllMocks();
      response = await createChatCommandHandler.execute(
        new CreateChatCommand(memberIds),
      );
    });

    it('should call chat find first', async () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          users: { every: { id: { in: memberIds } } },
        },
      });
    });

    it('should call chat create', async () => {
      expect(prismaService.chat.create).toBeCalledTimes(1);
      expect(prismaService.chat.create).toBeCalledWith({
        data: {
          users: {
            connect: memberIds.map((id) => ({
              id,
            })),
          },
        },
      });
    });

    it('should return undefined', async () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when such chat already exists', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest.fn().mockResolvedValue({});
    });

    let response;
    const userPairId = '34545656';
    const memberIds = [userStub().id, userPairId];

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        response = await createChatCommandHandler.execute(
          new CreateChatCommand(memberIds),
        );
      } catch {}
    });

    it('should call chat find first', async () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          users: { every: { id: { in: memberIds } } },
        },
      });
    });

    it('should call chat create', async () => {
      expect(prismaService.chat.create).not.toBeCalled();
    });

    it('should return undefined', async () => {
      expect(response).toEqual(undefined);
    });
  });
});
