import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { userStub } from 'users/test/stubs';
import { UsersSelector } from 'users/users.selector';
import { GetUserByEmailQueryHandler } from './get-user-by-email.query-handler';
import { GetUserByEmailQuery } from './get-user-by-email.query';

describe('when get user by email is called', () => {
  let prismaService: PrismaService;
  let getUserByEmailQueryHandler: GetUserByEmailQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetUserByEmailQueryHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    getUserByEmailQueryHandler = moduleRef.get<GetUserByEmailQueryHandler>(
      GetUserByEmailQueryHandler,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  let user: User;

  beforeEach(async () => {
    user = await getUserByEmailQueryHandler.execute(
      new GetUserByEmailQuery(userStub().email),
    );
  });

  it('should call find unique', async () => {
    expect(prismaService.user.findUnique).toBeCalledTimes(1);
    expect(prismaService.user.findUnique).toBeCalledWith({
      where: { email: userStub().email },
      include: UsersSelector.selectUser(),
    });
  });

  it('should return a user', async () => {
    expect(user).toEqual({ ...userStub(), _count: { pairFor: 0 } });
  });
});
