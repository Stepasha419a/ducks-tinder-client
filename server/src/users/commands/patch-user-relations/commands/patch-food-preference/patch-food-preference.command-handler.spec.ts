import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub } from 'users/test/stubs';
import { PatchFoodPreferenceCommandHandler } from './patch-food-preference.command-handler';
import { PatchFoodPreferenceCommand } from './patch-food-preference.command';

describe('when patch food preference sign is called', () => {
  let prismaService: PrismaService;
  let patchFoodPreferenceCommandHandler: PatchFoodPreferenceCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchFoodPreferenceCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    patchFoodPreferenceCommandHandler =
      moduleRef.get<PatchFoodPreferenceCommandHandler>(
        PatchFoodPreferenceCommandHandler,
      );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new when it was already connected another relation)', () => {
    beforeAll(() => {
      prismaService.foodPreference.findUnique = jest
        .fn()
        .mockResolvedValue('food-preference');
    });

    let response: void;
    const foodPreferenceName = 'food-preference';

    beforeEach(async () => {
      response = await patchFoodPreferenceCommandHandler.execute(
        new PatchFoodPreferenceCommand(requestUserStub(), foodPreferenceName),
      );
    });

    it('should call food preference find unique', () => {
      expect(prismaService.foodPreference.findUnique).toBeCalledTimes(1);
      expect(prismaService.foodPreference.findUnique).toBeCalledWith({
        where: { name: foodPreferenceName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        data: {
          foodPreference: { disconnect: true },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        where: { id: requestUserStub().id },
        data: {
          foodPreference: { connect: { name: foodPreferenceName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to connect new without already connected)', () => {
    beforeAll(() => {
      prismaService.foodPreference.findUnique = jest
        .fn()
        .mockResolvedValue('food-preference');
    });

    let response: void;
    const foodPreferenceName = 'food-preference';

    beforeEach(async () => {
      response = await patchFoodPreferenceCommandHandler.execute(
        new PatchFoodPreferenceCommand(
          { ...requestUserStub(), foodPreference: null },
          foodPreferenceName,
        ),
      );
    });

    it('should call food preference find unique', () => {
      expect(prismaService.foodPreference.findUnique).toBeCalledTimes(1);
      expect(prismaService.foodPreference.findUnique).toBeCalledWith({
        where: { name: foodPreferenceName },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          foodPreference: { connect: { name: foodPreferenceName } },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when it is called correctly (to disconnect only)', () => {
    beforeAll(() => {
      prismaService.foodPreference.findUnique = jest
        .fn()
        .mockResolvedValue('food-preference');
    });

    let response: void;
    const foodPreferenceName = null;

    beforeEach(async () => {
      response = await patchFoodPreferenceCommandHandler.execute(
        new PatchFoodPreferenceCommand(requestUserStub(), foodPreferenceName),
      );
    });

    it('should not call food preference find unique', () => {
      expect(prismaService.foodPreference.findUnique).not.toBeCalled();
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          foodPreference: { disconnect: true },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there is no such item', () => {
    beforeAll(() => {
      prismaService.foodPreference.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);
    });

    let response: void;
    let error;
    const foodPreferenceName = 'food-preference';

    beforeEach(async () => {
      try {
        response = await patchFoodPreferenceCommandHandler.execute(
          new PatchFoodPreferenceCommand(requestUserStub(), foodPreferenceName),
        );
      } catch (responseError) {
        error = responseError;
      }
    });

    it('should call food preference find unique', () => {
      expect(prismaService.foodPreference.findUnique).toBeCalledTimes(1);
      expect(prismaService.foodPreference.findUnique).toBeCalledWith({
        where: { name: foodPreferenceName },
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
