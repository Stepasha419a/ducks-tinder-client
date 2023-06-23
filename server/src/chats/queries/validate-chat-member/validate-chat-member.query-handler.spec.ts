import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { shortChatStub } from 'chats/test/stubs';
import { requestUserStub } from 'users/test/stubs';
import { ValidateChatMemberQueryHandler } from './validate-chat-member.query-handler';
import { ValidateChatMemberQuery } from './validate-chat-member.query';

describe('when get messages is called', () => {
  let prismaService: PrismaService;
  let validateChatMemberQueryHandler: ValidateChatMemberQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ValidateChatMemberQueryHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(ChatsPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    validateChatMemberQueryHandler =
      moduleRef.get<ValidateChatMemberQueryHandler>(
        ValidateChatMemberQueryHandler,
      );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest
        .fn()
        .mockResolvedValue(shortChatStub());
    });

    let response;

    beforeEach(async () => {
      jest.clearAllMocks();
      response = await validateChatMemberQueryHandler.execute(
        new ValidateChatMemberQuery(requestUserStub(), shortChatStub().id),
      );
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: shortChatStub().id,
          users: { some: { id: requestUserStub().id } },
        },
        select: {
          id: true,
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such chat', () => {
    beforeAll(() => {
      prismaService.chat.findFirst = jest.fn().mockResolvedValue(undefined);
    });

    let response;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        response = await validateChatMemberQueryHandler.execute(
          new ValidateChatMemberQuery(requestUserStub(), shortChatStub().id),
        );
      } catch {}
    });

    it('should call chat find first', () => {
      expect(prismaService.chat.findFirst).toBeCalledTimes(1);
      expect(prismaService.chat.findFirst).toBeCalledWith({
        where: {
          id: shortChatStub().id,
          users: { some: { id: requestUserStub().id } },
        },
        select: {
          id: true,
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });
});
