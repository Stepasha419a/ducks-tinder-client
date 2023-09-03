import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchPetCommandHandler } from './patch-pet.command-handler';
import { PatchPetCommand } from './patch-pet.command';

describe('when patch pet sign is called', () => {
  let prismaService: PrismaService;
  let patchPetCommandHandler: PatchPetCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchPetCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchPetCommandHandler = moduleRef.get<PatchPetCommandHandler>(
      PatchPetCommandHandler,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.pet.findUnique = jest.fn().mockResolvedValue('pet');
    });

    let response: void;
    const petName = 'pet';

    beforeEach(async () => {
      response = await patchPetCommandHandler.execute(
        new PatchPetCommand(requestUserStub(), petName),
      );
    });

    it('should call pet find unique', () => {
      expect(prismaService.pet.findUnique).toBeCalledTimes(1);
      expect(prismaService.pet.findUnique).toBeCalledWith({
        where: { name: petName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          pet: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          pet: { connect: { name: petName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.pet.findUnique = jest.fn().mockResolvedValue('pet');
    });

    let response: void;
    const petName = 'pet';

    beforeEach(async () => {
      response = await patchPetCommandHandler.execute(
        new PatchPetCommand({ ...requestUserStub(), pet: null }, petName),
      );
    });

    it('should call pet find unique', () => {
      expect(prismaService.pet.findUnique).toBeCalledTimes(1);
      expect(prismaService.pet.findUnique).toBeCalledWith({
        where: { name: petName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          pet: { connect: { name: petName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.pet.findUnique = jest.fn().mockResolvedValue('pet');
    });

    let response: void;
    const petName = null;

    beforeEach(async () => {
      response = await patchPetCommandHandler.execute(
        new PatchPetCommand(requestUserStub(), petName),
      );
    });

    it('should not call pet find unique', () => {
      expect(prismaService.pet.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          pet: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.pet.findUnique = jest.fn().mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const petName = 'pet';

    beforeEach(async () => {
      try {
        response = await patchPetCommandHandler.execute(
          new PatchPetCommand(requestUserStub(), petName),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call pet find unique', () => {
      expect(prismaService.pet.findUnique).toBeCalledTimes(1);
      expect(prismaService.pet.findUnique).toBeCalledWith({
        where: { name: petName },
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
