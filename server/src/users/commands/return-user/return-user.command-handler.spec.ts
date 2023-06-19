import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub, userDtoStub } from 'users/test/stubs';
import { ReturnUserCommandHandler } from './return-user.command-handler';
import { ReturnUserCommand } from './return-user.command';

describe('when return user is called', () => {
  let prismaService: PrismaService;
  let returnUserCommandHandler: ReturnUserCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ReturnUserCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    returnUserCommandHandler = moduleRef.get<ReturnUserCommandHandler>(
      ReturnUserCommandHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValue({ pairFor: [{ id: userDtoStub().id }] });
      prismaService.checkedUsers.findFirst = jest.fn().mockResolvedValue({
        checkedId: userDtoStub().id,
        wasCheckedId: requestUserStub().id,
      });
    });

    let response;

    beforeEach(async () => {
      jest.clearAllMocks();
      response = await returnUserCommandHandler.execute(
        new ReturnUserCommand(requestUserStub()),
      );
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: requestUserStub().id },
        select: { pairFor: { select: { id: true } } },
      });
    });

    it('should call checkedUsers find first', () => {
      expect(prismaService.checkedUsers.findFirst).toBeCalledTimes(1);
      expect(prismaService.checkedUsers.findFirst).toBeCalledWith({
        where: {
          wasCheckedId: requestUserStub().id,
          checked: { id: { notIn: [userDtoStub().id] } },
        },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should call checkedUsers delete', () => {
      expect(prismaService.checkedUsers.delete).toBeCalledTimes(1);
      expect(prismaService.checkedUsers.delete).toBeCalledWith({
        where: {
          checkedId_wasCheckedId: {
            checkedId: userDtoStub().id,
            wasCheckedId: requestUserStub().id,
          },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });
});
