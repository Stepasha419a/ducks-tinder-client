import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchCommunicationStyleCommandHandler } from './patch-communication-style.command-handler';
import { PatchCommunicationStyleCommand } from './patch-communication-style.command';

describe('when patch communication style sign is called', () => {
  let prismaService: PrismaService;
  let patchCommunicationStyleCommandHandler: PatchCommunicationStyleCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchCommunicationStyleCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchCommunicationStyleCommandHandler =
      moduleRef.get<PatchCommunicationStyleCommandHandler>(
        PatchCommunicationStyleCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.communicationStyle.findUnique = jest
        .fn()
        .mockResolvedValue('communication-style');
    });

    let response: void;
    const communicationStyleName = 'communication-style';

    beforeEach(async () => {
      response = await patchCommunicationStyleCommandHandler.execute(
        new PatchCommunicationStyleCommand(
          requestUserStub(),
          communicationStyleName,
        ),
      );
    });

    it('should call communication style find unique', () => {
      expect(prismaService.communicationStyle.findUnique).toBeCalledTimes(1);
      expect(prismaService.communicationStyle.findUnique).toBeCalledWith({
        where: { name: communicationStyleName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          communicationStyle: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          communicationStyle: { connect: { name: communicationStyleName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.communicationStyle.findUnique = jest
        .fn()
        .mockResolvedValue('communication-style');
    });

    let response: void;
    const communicationStyleName = 'communication-style';

    beforeEach(async () => {
      response = await patchCommunicationStyleCommandHandler.execute(
        new PatchCommunicationStyleCommand(
          { ...requestUserStub(), communicationStyle: null },
          communicationStyleName,
        ),
      );
    });

    it('should call communication style find unique', () => {
      expect(prismaService.communicationStyle.findUnique).toBeCalledTimes(1);
      expect(prismaService.communicationStyle.findUnique).toBeCalledWith({
        where: { name: communicationStyleName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          communicationStyle: { connect: { name: communicationStyleName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.communicationStyle.findUnique = jest
        .fn()
        .mockResolvedValue('communication-style');
    });

    let response: void;
    const communicationStyleName = null;

    beforeEach(async () => {
      response = await patchCommunicationStyleCommandHandler.execute(
        new PatchCommunicationStyleCommand(
          requestUserStub(),
          communicationStyleName,
        ),
      );
    });

    it('should not call communication style find unique', () => {
      expect(prismaService.communicationStyle.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          communicationStyle: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.communicationStyle.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const communicationStyleName = 'communication-style';

    beforeEach(async () => {
      try {
        response = await patchCommunicationStyleCommandHandler.execute(
          new PatchCommunicationStyleCommand(
            requestUserStub(),
            communicationStyleName,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call communication style find unique', () => {
      expect(prismaService.communicationStyle.findUnique).toBeCalledTimes(1);
      expect(prismaService.communicationStyle.findUnique).toBeCalledWith({
        where: { name: communicationStyleName },
      });
    });

    it('should not call user update', () => {
      expect(prismaService.user.update).not.toBeCalled();
    });

    it('should throw an error', () => {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Not Found');
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });
});
