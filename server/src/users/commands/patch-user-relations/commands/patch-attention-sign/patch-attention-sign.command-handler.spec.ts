import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchAttentionSignCommand } from './patch-attention-sign.command';
import { PatchAttentionSignCommandHandler } from './patch-attention-sign.command-handler';

describe('when patch attention sign is called', () => {
  let prismaService: PrismaService;
  let patchAttentionSignCommandHandler: PatchAttentionSignCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchAttentionSignCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchAttentionSignCommandHandler =
      moduleRef.get<PatchAttentionSignCommandHandler>(
        PatchAttentionSignCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.attentionSign.findUnique = jest
        .fn()
        .mockResolvedValue('attention-sign');
    });

    let response: void;
    const attentionSignName = 'attention-sign';

    beforeEach(async () => {
      response = await patchAttentionSignCommandHandler.execute(
        new PatchAttentionSignCommand(requestUserStub(), attentionSignName),
      );
    });

    it('should call attention sign find unique', () => {
      expect(prismaService.attentionSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.attentionSign.findUnique).toBeCalledWith({
        where: { name: attentionSignName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          attentionSign: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          attentionSign: { connect: { name: attentionSignName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.attentionSign.findUnique = jest
        .fn()
        .mockResolvedValue('attention-sign');
    });

    let response: void;
    const attentionSignName = 'attention-sign';

    beforeEach(async () => {
      response = await patchAttentionSignCommandHandler.execute(
        new PatchAttentionSignCommand(
          { ...requestUserStub(), attentionSign: null },
          attentionSignName,
        ),
      );
    });

    it('should call attention sign find unique', () => {
      expect(prismaService.attentionSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.attentionSign.findUnique).toBeCalledWith({
        where: { name: attentionSignName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          attentionSign: { connect: { name: attentionSignName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.attentionSign.findUnique = jest
        .fn()
        .mockResolvedValue('attention-sign');
    });

    let response: void;
    const attentionSignName = null;

    beforeEach(async () => {
      response = await patchAttentionSignCommandHandler.execute(
        new PatchAttentionSignCommand(requestUserStub(), attentionSignName),
      );
    });

    it('should not call attention sign find unique', () => {
      expect(prismaService.attentionSign.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          attentionSign: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.attentionSign.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const attentionSignName = 'attention-sign';

    beforeEach(async () => {
      try {
        response = await patchAttentionSignCommandHandler.execute(
          new PatchAttentionSignCommand(requestUserStub(), attentionSignName),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call attention sign find unique', () => {
      expect(prismaService.attentionSign.findUnique).toBeCalledTimes(1);
      expect(prismaService.attentionSign.findUnique).toBeCalledWith({
        where: { name: attentionSignName },
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
