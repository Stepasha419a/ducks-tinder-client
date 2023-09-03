import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchEducationCommandHandler } from './patch-education.command-handler';
import { PatchEducationCommand } from './patch-education.command';

describe('when patch education sign is called', () => {
  let prismaService: PrismaService;
  let patchEducationCommandHandler: PatchEducationCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchEducationCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchEducationCommandHandler = moduleRef.get<PatchEducationCommandHandler>(
      PatchEducationCommandHandler,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.education.findUnique = jest
        .fn()
        .mockResolvedValue('education');
    });

    let response: void;
    const educationName = 'education';

    beforeEach(async () => {
      response = await patchEducationCommandHandler.execute(
        new PatchEducationCommand(requestUserStub(), educationName),
      );
    });

    it('should call education find unique', () => {
      expect(prismaService.education.findUnique).toBeCalledTimes(1);
      expect(prismaService.education.findUnique).toBeCalledWith({
        where: { name: educationName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          education: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          education: { connect: { name: educationName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.education.findUnique = jest
        .fn()
        .mockResolvedValue('education');
    });

    let response: void;
    const educationName = 'education';

    beforeEach(async () => {
      response = await patchEducationCommandHandler.execute(
        new PatchEducationCommand(
          { ...requestUserStub(), education: null },
          educationName,
        ),
      );
    });

    it('should call education find unique', () => {
      expect(prismaService.education.findUnique).toBeCalledTimes(1);
      expect(prismaService.education.findUnique).toBeCalledWith({
        where: { name: educationName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          education: { connect: { name: educationName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.education.findUnique = jest
        .fn()
        .mockResolvedValue('education');
    });

    let response: void;
    const educationName = null;

    beforeEach(async () => {
      response = await patchEducationCommandHandler.execute(
        new PatchEducationCommand(requestUserStub(), educationName),
      );
    });

    it('should not call education find unique', () => {
      expect(prismaService.education.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          education: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.education.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const educationName = 'education';

    beforeEach(async () => {
      try {
        response = await patchEducationCommandHandler.execute(
          new PatchEducationCommand(requestUserStub(), educationName),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call education find unique', () => {
      expect(prismaService.education.findUnique).toBeCalledTimes(1);
      expect(prismaService.education.findUnique).toBeCalledWith({
        where: { name: educationName },
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
