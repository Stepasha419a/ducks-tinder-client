import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { Message } from 'chats/chats.interfaces';
import { fullChatStub, messageStub } from 'chats/test/stubs';
import { GetMessagesQueryHandler } from './get-messages.query-handler';
import { GetMessagesQuery } from './get-messages.query';
import { GET_MESSAGES_DTO } from 'chats/test/values/chats.const.dto';
import { requestUserStub } from 'users/test/stubs';

describe('when get messages is called', () => {
  let prismaService: PrismaService;
  let getMessagesQueryHandler: GetMessagesQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetMessagesQueryHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(ChatsPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    getMessagesQueryHandler = moduleRef.get<GetMessagesQueryHandler>(
      GetMessagesQueryHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest
        .fn()
        .mockResolvedValue(fullChatStub());
      prismaService.message.count = jest.fn().mockResolvedValue(40);
      prismaService.message.findMany = jest
        .fn()
        .mockResolvedValue([messageStub()]);
    });

    let messages: Message[];

    beforeEach(async () => {
      jest.clearAllMocks();
      messages = await getMessagesQueryHandler.execute(
        new GetMessagesQuery(requestUserStub(), GET_MESSAGES_DTO),
      );
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: GET_MESSAGES_DTO.chatId,
          users: { some: { id: requestUserStub().id } },
        },
        select: { id: true },
      });
    });

    it('should call message count', () => {
      expect(prismaService.message.count).toBeCalledTimes(1);
      expect(prismaService.message.count).toBeCalledWith({
        where: { chatId: GET_MESSAGES_DTO.chatId },
      });
    });

    it('should call message find many', () => {
      expect(prismaService.message.findMany).toBeCalledTimes(1);
      expect(prismaService.message.findMany).toBeCalledWith({
        where: {
          chatId: GET_MESSAGES_DTO.chatId,
        },
        select: { id: true, text: true, userId: true },
        orderBy: { createdAt: 'asc' },
        skip: 20,
        take: 20,
      });
    });

    it('should return an array of messages', () => {
      expect(messages).toEqual([messageStub()]);
    });
  });
});
