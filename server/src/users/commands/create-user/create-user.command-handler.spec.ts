import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'test/users/mocks';
import { userStub } from 'test/users/stubs';
import { UsersSelector } from 'users/users.selector';
import { CreateUserCommandHandler } from './create-user.command-handler';
import { CreateUserCommand } from './create-user.command';
import { CREATE_USER_DTO } from 'test/auth/values/auth.const.dto';
import { UserDto } from 'users/dto';

describe('when delete pair is called', () => {
  let prismaService: PrismaService;
  let createUserCommandHandler: CreateUserCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CreateUserCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    createUserCommandHandler = moduleRef.get<CreateUserCommandHandler>(
      CreateUserCommandHandler,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  let user: UserDto;

  beforeEach(async () => {
    user = await createUserCommandHandler.execute(
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
