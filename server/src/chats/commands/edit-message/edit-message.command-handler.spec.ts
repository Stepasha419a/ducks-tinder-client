import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { ChatsPrismaMock } from 'chats/test/mocks';
import { messageStub } from 'chats/test/stubs';
import { requestUserStub } from 'users/test/stubs';
import { Message } from 'chats/chats.interfaces';
import { EditMessageCommandHandler } from './edit-message.command-handler';
import { EditMessageCommand } from './edit-message.command';
import { EDIT_MESSAGE_DTO } from 'chats/test/values/chats.const.dto';

describe('when send message is called', () => {
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
      prismaService.message.findFirst = jest
        .fn()
        .mockResolvedValue(messageStub());
      prismaService.message.update = jest.fn().mockResolvedValue(messageStub());
    });

    let message: Message;

    beforeEach(async () => {
      jest.clearAllMocks();
      message = await editMessageCommandHandler.execute(
        new EditMessageCommand(requestUserStub(), EDIT_MESSAGE_DTO),
      );
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
        select: { id: true, text: true, userId: true },
      });
    });

    it('should return a message', () => {
      expect(message).toStrictEqual(messageStub());
    });
  });

  describe('when there is no such message', () => {
    beforeAll(() => {
      prismaService.message.findFirst = jest.fn().mockResolvedValue(undefined);
      prismaService.message.update = jest.fn();
    });

    let message: Message;

    beforeEach(async () => {
      jest.clearAllMocks();
      try {
        message = await editMessageCommandHandler.execute(
          new EditMessageCommand(requestUserStub(), EDIT_MESSAGE_DTO),
        );
      } catch {}
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
      expect(message).toEqual(undefined);
    });
  });
});
