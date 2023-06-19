import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { requestUserStub, userDtoStub } from 'users/test/stubs';
import { DislikeUserCommand } from './dislike-user.command';
import { DislikeUserCommandHandler } from './dislike-user.command-handler';

describe('when dislike user is called', () => {
  let prismaService: PrismaService;
  let dislikeUserCommandHandler: DislikeUserCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DislikeUserCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dislikeUserCommandHandler = moduleRef.get<DislikeUserCommandHandler>(
      DislikeUserCommandHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValue(userDtoStub());
      prismaService.checkedUsers.findMany = jest.fn().mockResolvedValue([]);
    });

    let response;

    beforeEach(async () => {
      jest.clearAllMocks();
      response = await dislikeUserCommandHandler.execute(
        new DislikeUserCommand(requestUserStub(), '34545656'),
      );
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: '34545656' },
      });
    });

    it('should call checkedUsers find many', () => {
      expect(prismaService.checkedUsers.findMany).toBeCalledTimes(1);
      expect(prismaService.checkedUsers.findMany).toBeCalledWith({
        where: {
          OR: [{ checkedId: requestUserStub().id }, { checkedId: '34545656' }],
        },
        select: {
          checked: { select: { id: true } },
          wasChecked: { select: { id: true } },
        },
      });
    });

    it('should call checkedUsers create', () => {
      expect(prismaService.checkedUsers.create).toBeCalledTimes(1);
      expect(prismaService.checkedUsers.create).toBeCalledWith({
        data: { wasCheckedId: requestUserStub().id, checkedId: '34545656' },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });
});
