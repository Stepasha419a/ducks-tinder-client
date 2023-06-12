import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'test/users/mocks';
import { userStub } from 'test/users/stubs';
import { GetUserQueryHandler } from './get-user.query-handler';
import { GetUserQuery } from './get-user.query';
import { UserDto } from 'users/dto';
import { UsersSelector } from 'users/users.selector';

describe('when get user is called', () => {
  let prismaService: PrismaService;
  let getUserQueryHandler: GetUserQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetUserQueryHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    getUserQueryHandler =
      moduleRef.get<GetUserQueryHandler>(GetUserQueryHandler);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  let user: UserDto;

  beforeEach(async () => {
    user = await getUserQueryHandler.execute(new GetUserQuery(userStub().id));
  });

  it('should call find unique', async () => {
    expect(prismaService.user.findUnique).toBeCalledTimes(1);
    expect(prismaService.user.findUnique).toBeCalledWith({
      where: { id: userStub().id },
      include: UsersSelector.selectUser(),
    });
  });

  it('should return a user', async () => {
    expect(user).toEqual(userStub());
  });
});
