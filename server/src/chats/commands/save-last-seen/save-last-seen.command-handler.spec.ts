import { PrismaService } from 'prisma/prisma.service';
import { SaveLastSeenCommandHandler } from './save-last-seen.command-handler';
import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { SaveLastSeenCommand } from './save-last-seen.command';
import { requestUserStub } from 'users/test/stubs';
import { ChatIdDto } from 'chats/dto';
import { fullChatStub } from 'chats/test/stubs';

describe('when save last seen is called', () => {
  let saveLastSeenCommandHandler: SaveLastSeenCommandHandler;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SaveLastSeenCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(ChatsPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    saveLastSeenCommandHandler = moduleRef.get<SaveLastSeenCommandHandler>(
      SaveLastSeenCommandHandler,
    );

    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly', () => {
    let response;
    const dto: ChatIdDto = {
      chatId: fullChatStub().id,
    };

    beforeEach(async () => {
      response = await saveLastSeenCommandHandler.execute(
        new SaveLastSeenCommand(requestUserStub(), dto),
      );
    });

    it('should call chat visit upsert', () => {
      expect(prismaService.chatVisit.upsert).toBeCalledTimes(1);
      expect(prismaService.chatVisit.upsert).toBeCalledWith({
        where: {
          userId_chatId: { userId: requestUserStub().id, chatId: dto.chatId },
        },
        create: {
          lastSeen: new Date().toISOString(),
          userId: requestUserStub().id,
          chatId: dto.chatId,
        },
        update: { lastSeen: new Date().toISOString() },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });
});
