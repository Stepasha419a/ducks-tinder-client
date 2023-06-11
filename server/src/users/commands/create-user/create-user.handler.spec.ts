import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'test/users/mocks';
import { userStub } from 'test/users/stubs';
import { UsersSelector } from 'users/users.selector';
import { CreateUserHandler } from './create-user.handler';
import { CreateUserCommand } from './create-user.command';
import { CREATE_USER_DTO } from 'test/auth/values/auth.const.dto';
import { UserDto } from 'users/dto';

describe('when delete pair is called', () => {
  let prismaService: PrismaService;
  let createUserHandler: CreateUserHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CreateUserHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    createUserHandler = moduleRef.get<CreateUserHandler>(CreateUserHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  let user: UserDto;

  beforeEach(async () => {
    user = await createUserHandler.execute(
      new CreateUserCommand(CREATE_USER_DTO),
    );
  });

  it('should call create user', async () => {
    expect(prismaService.user.create).toBeCalledTimes(1);
    expect(prismaService.user.create).toBeCalledWith({
      data: CREATE_USER_DTO,
      include: UsersSelector.selectUser(),
    });
  });

  it('should return a user', async () => {
    expect(user).toEqual(userStub());
  });
});
