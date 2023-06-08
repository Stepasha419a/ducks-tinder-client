import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'test/users/mocks';
import { requestUserStub } from 'test/users/stubs';
import { DislikeUserCommand } from './dislike-user.command';
import { DislikeUserHandler } from './dislike-user.handler';

describe('when dislike user is called', () => {
  let prismaService: PrismaService;
  let dislikeUserHandler: DislikeUserHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DislikeUserHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    dislikeUserHandler = moduleRef.get<DislikeUserHandler>(DislikeUserHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  let response;

  beforeEach(async () => {
    response = await dislikeUserHandler.execute(
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
