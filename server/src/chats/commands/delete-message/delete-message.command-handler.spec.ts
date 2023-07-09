import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { fullChatStub, messageStub } from 'chats/test/stubs';
import { requestUserStub } from 'users/test/stubs';
import { DeleteMessageCommandHandler } from './delete-message.command-handler';
import { DeleteMessageCommand } from './delete-message.command';
import { Message } from 'chats/chats.interface';
import { ChatsSelector } from 'chats/chats.selector';
import { FORBIDDEN, NOT_FOUND } from 'common/constants/error';
import { DeleteMessageDto } from 'chats/dto';

describe('when delete message is called', () => {
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
    const createdAtDate = new Date();

    beforeAll(() => {
      prismaService.chat.findUnique = jest
        .fn()
        .mockResolvedValue(fullChatStub());
      prismaService.message.findFirst = jest
        .fn()
        .mockResolvedValue({ ...messageStub(), createdAt: createdAtDate });
      prismaService.message.delete = jest.fn();
    });

    let message: Message;
    const deleteMessageDto: DeleteMessageDto = {
      messageId: messageStub().id,
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      message = await deleteMessageCommandHandler.execute(
        new DeleteMessageCommand(
          requestUserStub(),
          fullChatStub().id,
          deleteMessageDto,
        ),
      );
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: fullChatStub().id },
        select: { blocked: true },
      });
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
      expect(message).toStrictEqual({
        ...messageStub(),
        createdAt: createdAtDate,
      });
    });
  });

  describe('when there is no such chat', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest.fn().mockResolvedValue(undefined);
      prismaService.message.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.message.delete = jest.fn();
    });

    let message: Message;
    let error;
    const deleteMessageDto: DeleteMessageDto = {
      messageId: messageStub().id,
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        message = await deleteMessageCommandHandler.execute(
          new DeleteMessageCommand(
            requestUserStub(),
            fullChatStub().id,
            deleteMessageDto,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: fullChatStub().id },
        select: { blocked: true },
      });
    });

    it('should not call message find first', () => {
      expect(prismaService.message.findFirst).not.toBeCalled();
    });

    it('should not call message delete', () => {
      expect(prismaService.message.delete).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(message).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error?.message).toEqual(FORBIDDEN);
    });
  });

  describe('when chat is blocked', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest
        .fn()
        .mockResolvedValue({ blocked: true });
      prismaService.message.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.message.delete = jest.fn();
    });

    let message: Message;
    let error;
    const deleteMessageDto: DeleteMessageDto = {
      messageId: messageStub().id,
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        message = await deleteMessageCommandHandler.execute(
          new DeleteMessageCommand(
            requestUserStub(),
            fullChatStub().id,
            deleteMessageDto,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: fullChatStub().id },
        select: { blocked: true },
      });
    });

    it('should not call message find first', () => {
      expect(prismaService.message.findFirst).not.toBeCalled();
    });

    it('should not call message delete', () => {
      expect(prismaService.message.delete).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(message).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error?.message).toEqual(FORBIDDEN);
    });
  });

  describe('when there is no such message', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest
        .fn()
        .mockResolvedValue(fullChatStub());
      prismaService.message.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.message.delete = jest.fn();
    });

    let message: Message;
    let error;
    const deleteMessageDto: DeleteMessageDto = {
      messageId: messageStub().id,
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        message = await deleteMessageCommandHandler.execute(
          new DeleteMessageCommand(
            requestUserStub(),
            fullChatStub().id,
            deleteMessageDto,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: fullChatStub().id },
        select: { blocked: true },
      });
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

    it('should throw an error', () => {
      expect(error?.message).toEqual(NOT_FOUND);
    });
  });

  describe('when there is too late to delete (> 12 hours lasted)', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest
        .fn()
        .mockResolvedValue(fullChatStub());
      prismaService.message.findFirst = jest.fn().mockResolvedValue({
        ...messageStub(),
        createdAt: new Date('2022-01-01'),
      });
      prismaService.message.delete = jest.fn();
    });

    let message: Message;
    let error;
    const deleteMessageDto: DeleteMessageDto = {
      messageId: messageStub().id,
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        message = await deleteMessageCommandHandler.execute(
          new DeleteMessageCommand(
            requestUserStub(),
            fullChatStub().id,
            deleteMessageDto,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: fullChatStub().id },
        select: { blocked: true },
      });
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
      expect(message).toStrictEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error?.message).toEqual(FORBIDDEN);
    });
  });
});
