import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchZodiacSignCommandHandler } from './patch-zodiac-sign.command-handler';
import { PatchZodiacSignCommand } from './patch-zodiac-sign.command';

describe('when patch zodiac sign sign is called', () => {
  let prismaService: PrismaService;
  let patchZodiacSignCommandHandler: PatchZodiacSignCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchZodiacSignCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchZodiacSignCommandHandler =
      moduleRef.get<PatchZodiacSignCommandHandler>(
        PatchZodiacSignCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.zodiacSign.findUnique = jest
        .fn()
        .mockResolvedValue('zodiac-sign');
    });

    let response: void;
    const zodiacSignName = 'zodiac-sign';

    beforeEach(async () => {
      response = await patchZodiacSignCommandHandler.execute(
        new PatchZodiacSignCommand(requestUserStub(), zodiacSignName),
      );
    });

    it('should call zodiac sign find unique', () => {
      expect(prismaService.zodiacSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.zodiacSign.findUnique).toBeCalledWith({
        where: { name: zodiacSignName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          zodiacSign: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          zodiacSign: { connect: { name: zodiacSignName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.zodiacSign.findUnique = jest
        .fn()
        .mockResolvedValue('zodiac-sign');
    });

    let response: void;
    const zodiacSignName = 'zodiac-sign';

    beforeEach(async () => {
      response = await patchZodiacSignCommandHandler.execute(
        new PatchZodiacSignCommand(
          { ...requestUserStub(), zodiacSign: null },
          zodiacSignName,
        ),
      );
    });

    it('should call zodiac sign find unique', () => {
      expect(prismaService.zodiacSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.zodiacSign.findUnique).toBeCalledWith({
        where: { name: zodiacSignName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          zodiacSign: { connect: { name: zodiacSignName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.zodiacSign.findUnique = jest
        .fn()
        .mockResolvedValue('zodiac-sign');
    });

    let response: void;
    const zodiacSignName = null;

    beforeEach(async () => {
      response = await patchZodiacSignCommandHandler.execute(
        new PatchZodiacSignCommand(requestUserStub(), zodiacSignName),
      );
    });

    it('should not call zodiac sign find unique', () => {
      expect(prismaService.zodiacSign.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          zodiacSign: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.zodiacSign.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const zodiacSignName = 'zodiac-sign';

    beforeEach(async () => {
      try {
        response = await patchZodiacSignCommandHandler.execute(
          new PatchZodiacSignCommand(requestUserStub(), zodiacSignName),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call zodiac sign find unique', () => {
      expect(prismaService.zodiacSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.zodiacSign.findUnique).toBeCalledWith({
        where: { name: zodiacSignName },
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
