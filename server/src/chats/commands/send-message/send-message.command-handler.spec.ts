import { SendMessageDto } from 'chats/dto';
import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { messageStub } from 'chats/test/stubs';
import { SendMessageCommandHandler } from './send-message.command-handler';
import { SendMessageCommand } from './send-message.command';
import { Message } from '@prisma/client';

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
      prismaService.message.create = jest.fn().mockResolvedValue(messageStub());
    });

    let message: Message;
    const sendMessageDto: SendMessageDto = {
      chatId: 'chat-id',
      userId: 'user-id',
      text: 'message-text',
    };

    beforeEach(async () => {
      jest.clearAllMocks();
      message = await sendMessageCommandHandler.execute(
        new SendMessageCommand(sendMessageDto),
      );
    });

    it('should call message create', () => {
      expect(prismaService.message.create).toBeCalledTimes(1);
      expect(prismaService.message.create).toBeCalledWith({
        data: sendMessageDto,
      });
    });

    it('should return a message', () => {
      expect(message).toStrictEqual(messageStub());
    });
  });
});
