import { PrismaService } from 'prisma/prisma.service';
import { DeleteChatCommandHandler } from './delete-chat.command-handler';
import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { ChatSocketReturn } from 'chats/chats.interface';
import { fullChatStub, requestUserStub } from 'chats/test/stubs';
import { DeleteChatCommand } from './delete-chat.command';
import { ChatIdDto } from 'chats/dto';

describe('when delete chat is called', () => {
  let prismaService: PrismaService;
  let deleteChatCommandHandler: DeleteChatCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DeleteChatCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(ChatsPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    deleteChatCommandHandler = moduleRef.get<DeleteChatCommandHandler>(
      DeleteChatCommandHandler,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest
        .fn()
        .mockResolvedValue(fullChatStub());
      prismaService.chat.delete = jest.fn().mockResolvedValue(fullChatStub());
    });

    let data: ChatSocketReturn;
    const dto: ChatIdDto = {
      chatId: fullChatStub().id,
    };

    beforeEach(async () => {
      data = await deleteChatCommandHandler.execute(
        new DeleteChatCommand(requestUserStub(), dto),
      );
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: dto.chatId,
          users: { some: { id: requestUserStub().id } },
        },
      });
    });

    it('should call chat visit delete many', () => {
      expect(prismaService.chatVisit.deleteMany).toBeCalledTimes(1);
      expect(prismaService.chatVisit.deleteMany).toBeCalledWith({
        where: { chatId: fullChatStub().id },
      });
    });

    it('should call chat delete', () => {
      expect(prismaService.chat.delete).toBeCalledTimes(1);
      expect(prismaService.chat.delete).toBeCalledWith({
        where: { id: fullChatStub().id },
        select: { users: { select: { id: true } }, id: true },
      });
    });

    it('should return data', () => {
      expect(data).toEqual({
        chatId: fullChatStub().id,
        users: [requestUserStub().id],
      });
    });
  });

  describe('when there is no such chat', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.chat.delete = jest.fn().mockResolvedValue(fullChatStub());
    });

    let data: ChatSocketReturn;
    let error;
    const dto: ChatIdDto = {
      chatId: fullChatStub().id,
    };

    beforeEach(async () => {
      try {
        data = await deleteChatCommandHandler.execute(
          new DeleteChatCommand(requestUserStub(), dto),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: dto.chatId,
          users: { some: { id: requestUserStub().id } },
        },
      });
    });

    it('should not call chat visit delete many', () => {
      expect(prismaService.chatVisit.deleteMany).not.toBeCalled();
    });

    it('should not call chat delete', () => {
      expect(prismaService.chat.delete).not.toBeCalled();
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });

    it('should return undefined', () => {
      expect(data).toEqual(undefined);
    });
  });
});
