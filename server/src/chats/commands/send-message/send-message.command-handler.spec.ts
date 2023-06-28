import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { messageStub, shortChatStub } from 'chats/test/stubs';
import { SendMessageCommandHandler } from './send-message.command-handler';
import { SendMessageCommand } from './send-message.command';
import { requestUserStub } from 'users/test/stubs';
import { SendMessageDto } from 'chats/dto';
import { Message } from 'chats/chats.interfaces';
import { ChatsSelector } from 'chats/chats.selector';

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
      } catch {}
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
  });
});
