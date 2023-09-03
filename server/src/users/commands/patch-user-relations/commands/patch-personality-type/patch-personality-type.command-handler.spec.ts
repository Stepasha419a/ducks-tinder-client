import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchPersonalityTypeCommandHandler } from './patch-personality-type.command-handler';
import { PatchPersonalityTypeCommand } from './patch-personality-type.command';

describe('when patch personality type sign is called', () => {
  let prismaService: PrismaService;
  let patchPersonalityTypeCommandHandler: PatchPersonalityTypeCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchPersonalityTypeCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchPersonalityTypeCommandHandler =
      moduleRef.get<PatchPersonalityTypeCommandHandler>(
        PatchPersonalityTypeCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.personalityType.findUnique = jest
        .fn()
        .mockResolvedValue('personality-type');
    });

    let response: void;
    const personalityTypeName = 'personality-type';

    beforeEach(async () => {
      response = await patchPersonalityTypeCommandHandler.execute(
        new PatchPersonalityTypeCommand(requestUserStub(), personalityTypeName),
      );
    });

    it('should call personality type find unique', () => {
      expect(prismaService.personalityType.findUnique).toBeCalledTimes(1);
      expect(prismaService.personalityType.findUnique).toBeCalledWith({
        where: { name: personalityTypeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          personalityType: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          personalityType: { connect: { name: personalityTypeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.personalityType.findUnique = jest
        .fn()
        .mockResolvedValue('personality-type');
    });

    let response: void;
    const personalityTypeName = 'personality-type';

    beforeEach(async () => {
      response = await patchPersonalityTypeCommandHandler.execute(
        new PatchPersonalityTypeCommand(
          { ...requestUserStub(), personalityType: null },
          personalityTypeName,
        ),
      );
    });

    it('should call personality type find unique', () => {
      expect(prismaService.personalityType.findUnique).toBeCalledTimes(1);
      expect(prismaService.personalityType.findUnique).toBeCalledWith({
        where: { name: personalityTypeName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          personalityType: { connect: { name: personalityTypeName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.personalityType.findUnique = jest
        .fn()
        .mockResolvedValue('personality-type');
    });

    let response: void;
    const personalityTypeName = null;

    beforeEach(async () => {
      response = await patchPersonalityTypeCommandHandler.execute(
        new PatchPersonalityTypeCommand(requestUserStub(), personalityTypeName),
      );
    });

    it('should not call personality type find unique', () => {
      expect(prismaService.personalityType.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          personalityType: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.personalityType.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const personalityTypeName = 'personality-type';

    beforeEach(async () => {
      try {
        response = await patchPersonalityTypeCommandHandler.execute(
          new PatchPersonalityTypeCommand(
            requestUserStub(),
            personalityTypeName,
          ),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call personality type find unique', () => {
      expect(prismaService.personalityType.findUnique).toBeCalledTimes(1);
      expect(prismaService.personalityType.findUnique).toBeCalledWith({
        where: { name: personalityTypeName },
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
