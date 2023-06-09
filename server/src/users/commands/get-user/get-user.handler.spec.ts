import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'test/users/mocks';
import { userStub } from 'test/users/stubs';
import { GetUserHandler } from './get-user.handler';
import { GetUserCommand } from './get-user.command';
import { UserDto } from 'users/dto';
import { UsersSelector } from 'users/users.selector';

describe('when get user is called', () => {
  let prismaService: PrismaService;
  let getUserHandler: GetUserHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetUserHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    getUserHandler = moduleRef.get<GetUserHandler>(GetUserHandler);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  let user: UserDto;

  beforeEach(async () => {
    user = await getUserHandler.execute(new GetUserCommand(userStub().id));
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
