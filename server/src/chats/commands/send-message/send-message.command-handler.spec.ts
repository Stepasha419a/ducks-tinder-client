import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { fullChatStub, messageStub, shortChatStub } from 'chats/test/stubs';
import { SendMessageCommandHandler } from './send-message.command-handler';
import { SendMessageCommand } from './send-message.command';
import { requestUserStub } from 'users/test/stubs';
import { SendMessageDto } from 'chats/dto';
import { Message } from 'chats/chats.interface';
import { ChatsSelector } from 'chats/chats.selector';
import { FORBIDDEN } from 'common/constants/error';

describe('when send message is called', () => {
  let prismaService: PrismaService;
  let sendMessageCommandHandler: SendMessageCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SendMessageCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(ChatsPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    sendMessageCommandHandler = moduleRef.get<SendMessageCommandHandler>(
      SendMessageCommandHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest
        .fn()
        .mockResolvedValue(fullChatStub());
      prismaService.message.findUnique = jest
        .fn()
        .mockResolvedValue(messageStub());
      prismaService.message.create = jest.fn().mockResolvedValue({
        ...messageStub(),
        replied: {
          id: 'replied-message-id',
          text: 'replied-message-text',
          userId: 'replied-user-id',
        },
        repliedId: undefined,
      });
    });

    let message: Message;
    const sendMessageDto: SendMessageDto = {
      text: 'message-text',
      repliedId: 'replied-message-id',
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      message = await sendMessageCommandHandler.execute(
        new SendMessageCommand(
          requestUserStub(),
          shortChatStub().id,
          sendMessageDto,
        ),
      );
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: shortChatStub().id },
        select: { blocked: true },
      });
    });

    it('should call message find unique', () => {
      expect(prismaService.message.findUnique).toBeCalledTimes(1);
      expect(prismaService.message.findUnique).toBeCalledWith({
        where: { id: sendMessageDto.repliedId },
      });
    });

    it('should call message create', () => {
      expect(prismaService.message.create).toBeCalledTimes(1);
      expect(prismaService.message.create).toBeCalledWith({
        data: {
          userId: requestUserStub().id,
          chatId: shortChatStub().id,
          text: sendMessageDto.text,
          repliedId: sendMessageDto.repliedId,
        },
        select: ChatsSelector.selectMessage(),
      });
    });

    it('should return a message', () => {
      expect(message).toStrictEqual({
        ...messageStub(),
        replied: {
          id: 'replied-message-id',
          text: 'replied-message-text',
          userId: 'replied-user-id',
        },
        repliedId: undefined,
      });
    });
  });

  describe('when there is no replied message', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest
        .fn()
        .mockResolvedValue(fullChatStub());
      prismaService.message.findUnique = jest.fn().mockResolvedValue(undefined);
      prismaService.message.create = jest.fn().mockResolvedValue({
        ...messageStub(),
        replied: {
          id: 'replied-message-id',
          text: 'replied-message-text',
          userId: 'replied-user-id',
        },
        repliedId: undefined,
      });
    });

    let message: Message;
    let error;
    const sendMessageDto: SendMessageDto = {
      text: 'message-text',
      repliedId: 'replied-message-id',
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        message = await sendMessageCommandHandler.execute(
          new SendMessageCommand(
            requestUserStub(),
            shortChatStub().id,
            sendMessageDto,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: shortChatStub().id },
        select: { blocked: true },
      });
    });

    it('should call message find unique', () => {
      expect(prismaService.message.findUnique).toBeCalledTimes(1);
      expect(prismaService.message.findUnique).toBeCalledWith({
        where: { id: sendMessageDto.repliedId },
      });
    });

    it('should not call message create', () => {
      expect(prismaService.message.create).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(message).toStrictEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error?.message).toEqual('Not Found');
    });
  });

  describe('when there is no such chat', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest.fn().mockResolvedValue(undefined);
      prismaService.message.findUnique = jest
        .fn()
        .mockResolvedValue(messageStub());
      prismaService.message.create = jest.fn().mockResolvedValue({
        ...messageStub(),
        replied: {
          id: 'replied-message-id',
          text: 'replied-message-text',
          userId: 'replied-user-id',
        },
        repliedId: undefined,
      });
    });

    let message: Message;
    let error;
    const sendMessageDto: SendMessageDto = {
      text: 'message-text',
      repliedId: 'replied-message-id',
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        message = await sendMessageCommandHandler.execute(
          new SendMessageCommand(
            requestUserStub(),
            shortChatStub().id,
            sendMessageDto,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: shortChatStub().id },
        select: { blocked: true },
      });
    });

    it('should not call message find unique', () => {
      expect(prismaService.message.findUnique).not.toBeCalled();
    });

    it('should not call message create', () => {
      expect(prismaService.message.create).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(message).toStrictEqual(undefined);
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
      prismaService.message.findUnique = jest
        .fn()
        .mockResolvedValue(messageStub());
      prismaService.message.create = jest.fn().mockResolvedValue({
        ...messageStub(),
        replied: {
          id: 'replied-message-id',
          text: 'replied-message-text',
          userId: 'replied-user-id',
        },
        repliedId: undefined,
      });
    });

    let message: Message;
    let error;
    const sendMessageDto: SendMessageDto = {
      text: 'message-text',
      repliedId: 'replied-message-id',
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        message = await sendMessageCommandHandler.execute(
          new SendMessageCommand(
            requestUserStub(),
            shortChatStub().id,
            sendMessageDto,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: shortChatStub().id },
        select: { blocked: true },
      });
    });

    it('should not call message find unique', () => {
      expect(prismaService.message.findUnique).not.toBeCalled();
    });

    it('should not call message create', () => {
      expect(prismaService.message.create).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(message).toStrictEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error?.message).toEqual(FORBIDDEN);
    });
  });
});
