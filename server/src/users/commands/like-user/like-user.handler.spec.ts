import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { FilesServiceMock, UsersPrismaMock } from 'test/users/mocks';
import { requestUserStub } from 'test/users/stubs';
import { FilesService } from 'files/files.service';
import { LikeUserHandler } from './like-user.handler';
import { LikeUserCommand } from './like-user.command';

describe('when like user is called', () => {
  let prismaService: PrismaService;
  let likeUserHandler: LikeUserHandler;

  const usersPrismaMock = UsersPrismaMock();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LikeUserHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(FilesService)
      .useValue(FilesServiceMock())
      .overrideProvider(PrismaService)
      .useValue(usersPrismaMock)
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    likeUserHandler = moduleRef.get<LikeUserHandler>(LikeUserHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  let response;

  beforeEach(async () => {
    response = await likeUserHandler.execute(
      new LikeUserCommand(requestUserStub(), '34545656'),
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

  it('should call user update', () => {
    expect(prismaService.user.update).toBeCalledTimes(1);
    expect(prismaService.user.update).toBeCalledWith({
      where: { id: '34545656' },
      data: {
        pairs: { connect: { id: requestUserStub().id } },
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
