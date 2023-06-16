import { Test } from '@nestjs/testing';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { CommandBusMock } from '../mocks';
import { ChatsService } from 'chats/chats.service';
import { userStub } from 'test/users/stubs';
import { CreateChatCommand } from 'chats/commands';

describe('chats-service', () => {
  let service: ChatsService;
  let commandBus: CommandBus;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ChatsService],
      imports: [CqrsModule],
    })
      .overrideProvider(CommandBus)
      .useValue(CommandBusMock())
      .compile();

    service = moduleRef.get<ChatsService>(ChatsService);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when service is ready', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when create is called', () => {
    let response;
    const userPairId = '34545656';

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(undefined);
    });

    beforeEach(async () => {
      response = await service.create([userStub().id, userPairId]);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new CreateChatCommand([userStub().id, userPairId]),
      );
    });

    it('should return undefined', async () => {
      expect(response).toEqual(undefined);
    });
  });
});
