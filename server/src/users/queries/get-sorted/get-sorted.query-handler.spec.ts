import { Test } from '@nestjs/testing';
import { ShortUser } from 'users/users.interface';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'test/users/mocks';
import { shortUserStub } from 'test/users/stubs';
import { GetSortedQueryHandler } from './get-sorted.query-handler';
import { GetSortedQuery } from './get-sorted.query';
import { GET_SORTED_FIND_FIRST_CALLED } from 'test/users/values/users.const.expect';
import { USER_SORTS_DATA } from 'test/users/values/users.const.dto';

describe('when get sorted is called', () => {
  let prismaService: PrismaService;
  let getSortedQueryHandler: GetSortedQueryHandler;

  const RequestMock = jest.fn().mockReturnValue({
    user: USER_SORTS_DATA,
  });

  let user: ShortUser;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetSortedQueryHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    getSortedQueryHandler = moduleRef.get<GetSortedQueryHandler>(
      GetSortedQueryHandler,
    );
    prismaService = moduleRef.get<PrismaService>(PrismaService);

    prismaService.user.findUnique = jest.fn().mockResolvedValue(() => ({
      checked: [],
    }));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    user = await getSortedQueryHandler.execute(
      new GetSortedQuery(RequestMock().user),
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
