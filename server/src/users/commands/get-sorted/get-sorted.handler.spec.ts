import { Test } from '@nestjs/testing';
import { ShortUser } from 'users/users.interface';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'test/users/mocks';
import { shortUserStub } from 'test/users/stubs';
import { GetSortedHandler } from './get-sorted.handler';
import { GetSortedCommand } from './get-sorted.command';
import { GET_SORTED_FIND_FIRST_CALLED } from 'test/users/values/users.const.expect';
import { USER_SORTS_DATA } from 'test/users/values/users.const.dto';

describe('when get sorted is called', () => {
  let prismaService: PrismaService;
  let getSortedHandler: GetSortedHandler;

  const RequestMock = jest.fn().mockReturnValue({
    user: USER_SORTS_DATA,
  });

  let user: ShortUser;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetSortedHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    getSortedHandler = moduleRef.get<GetSortedHandler>(GetSortedHandler);
    prismaService = moduleRef.get<PrismaService>(PrismaService);

    prismaService.user.findUnique = jest.fn().mockResolvedValue(() => ({
      checked: [],
    }));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    user = await getSortedHandler.execute(
      new GetSortedCommand(RequestMock().user),
    );
  });

  it('should call checked users find many', async () => {
    expect(prismaService.checkedUsers.findMany).toBeCalledTimes(1);
    expect(prismaService.checkedUsers.findMany).toBeCalledWith({
      where: {
        OR: [
          { checkedId: shortUserStub().id },
          { wasCheckedId: shortUserStub().id },
        ],
      },
      select: {
        checked: { select: { id: true } },
        wasChecked: { select: { id: true } },
      },
    });
  });

  it('should call find first', async () => {
    expect(prismaService.user.findFirst).toBeCalledTimes(1);
    expect(prismaService.user.findFirst).toBeCalledWith(
      GET_SORTED_FIND_FIRST_CALLED,
    );
  });

  it('should return a short user', async () => {
    expect(user).toEqual(shortUserStub());
  });
});
