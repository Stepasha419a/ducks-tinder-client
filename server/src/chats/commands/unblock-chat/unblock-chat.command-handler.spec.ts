import { PrismaService } from 'prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { fullChatStub } from 'chats/test/stubs';
import { FullChat } from 'chats/chats.interfaces';
import { requestUserStub } from 'users/test/stubs';
import { ChatsSelector } from 'chats/chats.selector';
import { UsersSelector } from 'users/users.selector';
import { PrismaModule } from 'prisma/prisma.module';
import { NOT_FOUND } from 'common/constants/error';
import { UnblockChatCommandHandler } from './unblock-chat.command-handler';
import { UnblockChatCommand } from './unblock-chat.command';

describe('when unblock chat is called', () => {
  let prismaService: PrismaService;
  let unblockChatCommandHandler: UnblockChatCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UnblockChatCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(ChatsPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    unblockChatCommandHandler = moduleRef.get<UnblockChatCommandHandler>(
      UnblockChatCommandHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest
        .fn()
        .mockResolvedValue(fullChatStub());
      prismaService.message.count = jest.fn().mockResolvedValue(20);
      prismaService.chat.update = jest.fn().mockResolvedValue(fullChatStub());
    });

    let chat: FullChat;

    beforeEach(async () => {
      jest.clearAllMocks();
      chat = await unblockChatCommandHandler.execute(
        new UnblockChatCommand(requestUserStub(), fullChatStub().id),
      );
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: fullChatStub().id,
          blocked: true,
          blockedById: requestUserStub().id,
        },
      });
    });

    it('should call message count', () => {
      expect(prismaService.message.count).toBeCalledTimes(1);
      expect(prismaService.message.count).toBeCalledWith({
        where: { chatId: fullChatStub().id },
      });
    });

    it('should call chat update', () => {
      expect(prismaService.chat.update).toBeCalledTimes(1);
      expect(prismaService.chat.update).toBeCalledWith({
        where: { id: fullChatStub().id },
        data: { blocked: false, blockedById: null },
        select: {
          id: true,
          messages: {
            skip: 0,
            take: 20,
            orderBy: { createdAt: 'asc' },
            select: ChatsSelector.selectMessage(),
          },
          users: {
            where: { id: { not: requestUserStub().id } },
            select: UsersSelector.selectShortUser(),
          },
          blocked: true,
          blockedById: true,
        },
      });
    });

    it('should return chat', () => {
      expect(chat).toEqual(fullChatStub());
    });
  });

  describe('when there is no such chat', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.message.count = jest.fn().mockResolvedValue(20);
      prismaService.chat.update = jest.fn().mockResolvedValue(fullChatStub());
    });

    let chat: FullChat;
    let error;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        chat = await unblockChatCommandHandler.execute(
          new UnblockChatCommand(requestUserStub(), fullChatStub().id),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: fullChatStub().id,
          blocked: true,
          blockedById: requestUserStub().id,
        },
      });
    });

    it('should call not message count', () => {
      expect(prismaService.message.count).not.toBeCalled();
    });

    it('should call chat update', () => {
      expect(prismaService.chat.update).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(chat).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error?.message).toEqual(NOT_FOUND);
    });
  });
});