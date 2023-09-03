import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub, userDtoStub } from 'users/test/stubs';
import { PrismaService } from 'prisma/prisma.service';
import { PatchInterestsCommandHandler } from './patch-interests.command-handler';
import { PrismaModule } from 'prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { PatchInterestsCommand } from './patch-interests.command';

describe('when patch is called', () => {
  let prismaService: PrismaService;
  let patchInterestsCommandHandler: PatchInterestsCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchInterestsCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    patchInterestsCommandHandler = moduleRef.get<PatchInterestsCommandHandler>(
      PatchInterestsCommandHandler,
    );
    prismaService = moduleRef.get<PrismaService>(PrismaService);

    prismaService.$transaction = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when it is called correctly (to connect new with disconnecting useless)', () => {
    let response: void;
    const dto = [
      'interest-name-1',
      'interest-name-2',
      'interest-name-3',
      'wrong-interest-name',
    ];

    beforeEach(async () => {
      prismaService.interest.findMany = jest
        .fn()
        .mockResolvedValueOnce([
          { id: 'interest-id-3', name: 'interest-name-3' },
          { id: 'interest-id-4', name: 'interest-name-4' },
          { id: 'interest-id-5', name: 'interest-name-5' },
        ])
        .mockResolvedValue([
          { id: 'interest-id-1', name: 'interest-name-1' },
          { id: 'interest-id-2', name: 'interest-name-2' },
          { id: 'interest-id-3', name: 'interest-name-3' },
        ]);

      response = await patchInterestsCommandHandler.execute(
        new PatchInterestsCommand(requestUserStub(), dto),
      );
    });

    it('should call find many interests', () => {
      expect(prismaService.interest.findMany).toBeCalledTimes(2);
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(1, {
        where: { users: { some: { id: requestUserStub().id } } },
        select: { id: true },
      });
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(2, {
        where: { name: { in: dto } },
        select: { id: true },
      });
    });

    it('should call update user', () => {
      expect(prismaService.user.update).toBeCalledTimes(4);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: userDtoStub().id },
        data: {
          interests: {
            connect: {
              id: 'interest-id-1',
            },
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        data: {
          interests: {
            connect: {
              id: 'interest-id-2',
            },
          },
        },
        where: {
          id: userDtoStub().id,
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(3, {
        data: {
          interests: {
            disconnect: {
              id: 'interest-id-4',
            },
          },
        },
        where: {
          id: userDtoStub().id,
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(4, {
        data: {
          interests: {
            disconnect: {
              id: 'interest-id-5',
            },
          },
        },
        where: {
          id: userDtoStub().id,
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there are no interests (not found => empty)', () => {
    let response: void;
    const dto = ['wrong-interest-name'];

    beforeEach(async () => {
      prismaService.interest.findMany = jest.fn().mockResolvedValue([]);

      response = await patchInterestsCommandHandler.execute(
        new PatchInterestsCommand(requestUserStub(), dto),
      );
    });

    it('should call find many interests', () => {
      expect(prismaService.interest.findMany).toBeCalledTimes(2);
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(1, {
        where: { users: { some: { id: requestUserStub().id } } },
        select: { id: true },
      });
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(2, {
        where: { name: { in: dto } },
        select: { id: true },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there were not interests before (new user)', () => {
    const dto = [];
    let response: void;

    beforeEach(async () => {
      prismaService.interest.findMany = jest
        .fn()
        .mockResolvedValueOnce([])
        .mockResolvedValue([
          { id: 'interest-id-1', name: 'interest-name-1' },
          { id: 'interest-id-2', name: 'interest-name-2' },
        ]);

      response = await patchInterestsCommandHandler.execute(
        new PatchInterestsCommand(requestUserStub(), dto),
      );
    });

    it('should call find many interests', () => {
      expect(prismaService.interest.findMany).toBeCalledTimes(2);
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(1, {
        where: { users: { some: { id: requestUserStub().id } } },
        select: { id: true },
      });
      expect(prismaService.interest.findMany).toHaveBeenNthCalledWith(2, {
        where: { name: { in: dto } },
        select: { id: true },
      });
    });

    it('should call update user', () => {
      expect(prismaService.user.update).toBeCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: userDtoStub().id },
        data: {
          interests: {
            connect: {
              id: 'interest-id-1',
            },
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        data: {
          interests: {
            connect: {
              id: 'interest-id-2',
            },
          },
        },
        where: {
          id: userDtoStub().id,
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when there are no connect interests (only disconnect)', () => {
    const dto = [];
    let response: void;

    beforeEach(async () => {
      prismaService.interest.findMany = jest
        .fn()
        .mockResolvedValueOnce([
          { id: 'interest-id-1', name: 'interest-name-1' },
          { id: 'interest-id-2', name: 'interest-name-2' },
          { id: 'interest-id-3', name: 'interest-name-3' },
        ])
        .mockResolvedValue([]);

      response = await patchInterestsCommandHandler.execute(
        new PatchInterestsCommand(requestUserStub(), dto),
      );
    });

    it('should call update user', () => {
      expect(prismaService.user.update).toBeCalledTimes(3);
      expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
        where: { id: userDtoStub().id },
        data: {
          interests: {
            disconnect: {
              id: 'interest-id-1',
            },
          },
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
        data: {
          interests: {
            disconnect: {
              id: 'interest-id-2',
            },
          },
        },
        where: {
          id: userDtoStub().id,
        },
      });
      expect(prismaService.user.update).toHaveBeenNthCalledWith(3, {
        data: {
          interests: {
            disconnect: {
              id: 'interest-id-3',
            },
          },
        },
        where: {
          id: userDtoStub().id,
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });
});
