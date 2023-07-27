import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { fullChatStub, messageStub } from 'chats/test/stubs';
import { requestUserStub } from 'users/test/stubs';
import { ChatSocketMessageReturn } from 'chats/chats.interface';
import { EditMessageCommandHandler } from './edit-message.command-handler';
import { EditMessageCommand } from './edit-message.command';
import { EDIT_MESSAGE_DTO } from 'chats/test/values/chats.const.dto';
import { ChatsSelector } from 'chats/chats.selector';
import { FORBIDDEN, NOT_FOUND } from 'common/constants/error';

describe('when edit message is called', () => {
  let prismaService: PrismaService;
  let editMessageCommandHandler: EditMessageCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EditMessageCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(ChatsPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    editMessageCommandHandler = moduleRef.get<EditMessageCommandHandler>(
      EditMessageCommandHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest.fn().mockResolvedValue({
        id: fullChatStub().id,
        users: [...fullChatStub().users, { id: 'another-user-id' }],
        blocked: fullChatStub().blocked,
        blockedById: fullChatStub().blockedById,
      });
      prismaService.message.findFirst = jest
        .fn()
        .mockResolvedValue({ ...messageStub(), createdAt: new Date() });
      prismaService.message.update = jest.fn().mockResolvedValue(messageStub());
    });

    let data: ChatSocketMessageReturn;

    beforeEach(async () => {
      jest.clearAllMocks();
      data = await editMessageCommandHandler.execute(
        new EditMessageCommand(requestUserStub(), EDIT_MESSAGE_DTO),
      );
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: fullChatStub().id },
        select: { id: true, blocked: true, users: { select: { id: true } } },
      });
    });

    it('should call message find first', () => {
      expect(prismaService.message.findFirst).toBeCalledTimes(1);
      expect(prismaService.message.findFirst).toBeCalledWith({
        where: { id: EDIT_MESSAGE_DTO.messageId, userId: requestUserStub().id },
      });
    });

    it('should call message update', () => {
      expect(prismaService.message.update).toBeCalledTimes(1);
      expect(prismaService.message.update).toBeCalledWith({
        where: { id: EDIT_MESSAGE_DTO.messageId },
        data: { text: EDIT_MESSAGE_DTO.text },
        select: ChatsSelector.selectMessage(),
      });
    });

    it('should return a data', () => {
      expect(data).toStrictEqual({
        chatId: fullChatStub().id,
        message: messageStub(),
        users: [requestUserStub().id, 'another-user-id'],
      });
    });
  });

  describe('when there is no such chat', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest.fn().mockResolvedValue(undefined);
      prismaService.message.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.message.update = jest.fn();
    });

    let data: ChatSocketMessageReturn;
    let error;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        data = await editMessageCommandHandler.execute(
          new EditMessageCommand(requestUserStub(), EDIT_MESSAGE_DTO),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: fullChatStub().id },
        select: { id: true, blocked: true, users: { select: { id: true } } },
      });
    });

    it('should not call message find first', () => {
      expect(prismaService.message.findFirst).not.toBeCalled();
    });

    it('should not call message update', () => {
      expect(prismaService.message.update).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(data).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(403);
      expect(error.message).toEqual(FORBIDDEN);
    });
  });

  describe('when chat is blocked', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest
        .fn()
        .mockResolvedValue({ blocked: true });
      prismaService.message.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.message.update = jest.fn();
    });

    let data: ChatSocketMessageReturn;
    let error;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        data = await editMessageCommandHandler.execute(
          new EditMessageCommand(requestUserStub(), EDIT_MESSAGE_DTO),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: fullChatStub().id },
        select: { id: true, blocked: true, users: { select: { id: true } } },
      });
    });

    it('should not call message find first', () => {
      expect(prismaService.message.findFirst).not.toBeCalled();
    });

    it('should not call message update', () => {
      expect(prismaService.message.update).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(data).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(403);
      expect(error.message).toEqual(FORBIDDEN);
    });
  });

  describe('when there is no such message', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest.fn().mockResolvedValue({
        id: fullChatStub().id,
        users: [...fullChatStub().users, { id: 'another-user-id' }],
        blocked: fullChatStub().blocked,
        blockedById: fullChatStub().blockedById,
      });
      prismaService.message.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.message.update = jest.fn();
    });

    let data: ChatSocketMessageReturn;
    let error;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        data = await editMessageCommandHandler.execute(
          new EditMessageCommand(requestUserStub(), EDIT_MESSAGE_DTO),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: fullChatStub().id },
        select: { id: true, blocked: true, users: { select: { id: true } } },
      });
    });

    it('should call message find first', () => {
      expect(prismaService.message.findFirst).toBeCalledTimes(1);
      expect(prismaService.message.findFirst).toBeCalledWith({
        where: { id: EDIT_MESSAGE_DTO.messageId, userId: requestUserStub().id },
      });
    });

    it('should not call message update', () => {
      expect(prismaService.message.update).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(data).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual(NOT_FOUND);
    });
  });

  describe('when there is too late to edit (> 6 hours lasted)', () => {
    beforeAll(() => {
      prismaService.chat.findUnique = jest.fn().mockResolvedValue({
        id: fullChatStub().id,
        users: [...fullChatStub().users, { id: 'another-user-id' }],
        blocked: fullChatStub().blocked,
        blockedById: fullChatStub().blockedById,
      });
      prismaService.message.findFirst = jest.fn().mockResolvedValue({
        ...messageStub(),
        createdAt: new Date('2018-01-01'),
      });
      prismaService.message.update = jest.fn();
    });

    let data: ChatSocketMessageReturn;
    let error;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        data = await editMessageCommandHandler.execute(
          new EditMessageCommand(requestUserStub(), EDIT_MESSAGE_DTO),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call chat find unique', () => {
      expect(prismaService.chat.findUnique).toBeCalledTimes(1);
      expect(prismaService.chat.findUnique).toBeCalledWith({
        where: { id: fullChatStub().id },
        select: { id: true, blocked: true, users: { select: { id: true } } },
      });
    });

    it('should call message find first', () => {
      expect(prismaService.message.findFirst).toBeCalledTimes(1);
      expect(prismaService.message.findFirst).toBeCalledWith({
        where: { id: EDIT_MESSAGE_DTO.messageId, userId: requestUserStub().id },
      });
    });

    it('should not call message update', () => {
      expect(prismaService.message.update).not.toBeCalled();
    });

    it('should return undefined', () => {
      expect(data).toEqual(undefined);
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(403);
      expect(error.message).toEqual(FORBIDDEN);
    });
  });
});
