import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { messageStub } from 'chats/test/stubs';
import { requestUserStub } from 'users/test/stubs';
import { DeleteMessageCommandHandler } from './delete-message.command-handler';
import { DeleteMessageCommand } from './delete-message.command';
import { Message } from 'chats/chats.interfaces';
import { ChatsSelector } from 'chats/chats.selector';

describe('when send message is called', () => {
  let prismaService: PrismaService;
  let deleteMessageCommandHandler: DeleteMessageCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DeleteMessageCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(ChatsPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    deleteMessageCommandHandler = moduleRef.get<DeleteMessageCommandHandler>(
      DeleteMessageCommandHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.message.findFirst = jest
        .fn()
        .mockResolvedValue(messageStub());
      prismaService.message.delete = jest.fn();
    });

    let message: Message;

    beforeEach(async () => {
      jest.clearAllMocks();
      message = await deleteMessageCommandHandler.execute(
        new DeleteMessageCommand(requestUserStub(), messageStub().id),
      );
    });

    it('should call message find first', () => {
      expect(prismaService.message.findFirst).toBeCalledTimes(1);
      expect(prismaService.message.findFirst).toBeCalledWith({
        where: { id: messageStub().id, userId: requestUserStub().id },
        select: ChatsSelector.selectMessage(),
      });
    });

    it('should call message delete', () => {
      expect(prismaService.message.delete).toBeCalledTimes(1);
      expect(prismaService.message.delete).toBeCalledWith({
        where: { id: messageStub().id },
      });
    });

    it('should return a message', () => {
      expect(message).toStrictEqual(messageStub());
    });
  });

  describe('when there is no such message', () => {
    beforeAll(() => {
      prismaService.message.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.message.delete = jest.fn();
    });

    let message: Message;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        message = await deleteMessageCommandHandler.execute(
          new DeleteMessageCommand(requestUserStub(), messageStub().id),
        );
      } catch {}
    });

    it('should call message find first', () => {
      expect(prismaService.message.findFirst).toBeCalledTimes(1);
      expect(prismaService.message.findFirst).toBeCalledWith({
        where: { id: messageStub().id, userId: requestUserStub().id },
        select: ChatsSelector.selectMessage(),
      });
    });

    it('should not call message delete', () => {
      expect(prismaService.message.delete).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(message).toEqual(undefined);
    });
  });
});
