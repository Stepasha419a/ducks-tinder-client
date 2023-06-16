import { Test } from '@nestjs/testing';
import { FilesModule } from 'files/files.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { UserDto } from 'users/dto';
import { PatchUserCommandHandler } from './patch-user.command-handler';
import { PatchUserCommand } from './patch-user.command';
import { requestUserStub, userStub } from 'users/test/stubs';
import { UPDATE_USER_DTO } from 'users/test/values/users.const.dto';

describe('when patch is called', () => {
  let prismaService: PrismaService;
  let patchUserCommandHandler: PatchUserCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PatchUserCommandHandler],
      imports: [FilesModule, PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    patchUserCommandHandler = moduleRef.get<PatchUserCommandHandler>(
      PatchUserCommandHandler,
    );
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  let user: UserDto;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    user = await patchUserCommandHandler.execute(
      new PatchUserCommand(requestUserStub(), UPDATE_USER_DTO),
    );
  });

  it('should call find many interests', async () => {
    expect(prismaService.interest.findMany).toBeCalledTimes(1);
    expect(prismaService.interest.findMany).toBeCalledWith({
      where: { name: { in: UPDATE_USER_DTO.interests } },
    });
  });

  it('should call update user', async () => {
    expect(prismaService.user.update).toBeCalledTimes(3);
    expect(prismaService.user.update).toHaveBeenNthCalledWith(1, {
      where: { id: userStub().id },
      data: {
        interests: {
          disconnect: {
            id: 'interest-id-1',
          },
        },
      },
    });
    expect(prismaService.user.update).toHaveBeenNthCalledWith(2, {
      data: {
        interests: {
          connect: {
            id: 'interest-id-2',
          },
        },
      },
      where: {
        id: userStub().id,
      },
    });
  });

  it('should return a user', async () => {
    expect(user).toEqual(userStub());
  });
});
