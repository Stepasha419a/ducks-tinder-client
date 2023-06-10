import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'test/users/mocks';
import { userStub } from 'test/users/stubs';
import { UsersSelector } from 'users/users.selector';
import { GetUserByEmailHandler } from './get-user-by-email.handler';
import { GetUserByEmailCommand } from './get-user-by-email.command';

describe('when get user by email is called', () => {
  let prismaService: PrismaService;
  let getUserByEmailHandler: GetUserByEmailHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetUserByEmailHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    getUserByEmailHandler = moduleRef.get<GetUserByEmailHandler>(
      GetUserByEmailHandler,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  let user: User;

  beforeEach(async () => {
    user = await getUserByEmailHandler.execute(
      new GetUserByEmailCommand(userStub().email),
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
