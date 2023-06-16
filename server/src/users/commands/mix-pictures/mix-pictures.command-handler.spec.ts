import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'users/test/mocks';
import { UserDto } from 'users/dto';
import { requestUserStub, userStub } from 'users/test/stubs';
import { UsersSelector } from 'users/users.selector';
import { MixPicturesCommandHandler } from './mix-pictures.command-handler';
import { MixPicturesCommand } from './mix-pictures.command';
import { MIX_PICTURES_DTO } from 'users/test/values/users.const.dto';

describe('when mix pictures is called', () => {
  let prismaService: PrismaService;
  let mixPicturesCommandHandler: MixPicturesCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MixPicturesCommandHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    mixPicturesCommandHandler = moduleRef.get<MixPicturesCommandHandler>(
      MixPicturesCommandHandler,
    );
  });

  let user: UserDto;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    user = await mixPicturesCommandHandler.execute(
      new MixPicturesCommand(requestUserStub(), MIX_PICTURES_DTO),
    );
  });

  it('should call user find unique', async () => {
    expect(prismaService.user.findUnique).toBeCalledTimes(1);
    expect(prismaService.user.findUnique).toBeCalledWith({
      where: { id: userStub().id },
      include: UsersSelector.selectUser(),
    });
  });

  it('should call picture update', async () => {
    expect(prismaService.picture.update).toBeCalledTimes(2);
    expect(prismaService.picture.update).toHaveBeenNthCalledWith(1, {
      where: { id: userStub().pictures[0].id },
      data: { order: MIX_PICTURES_DTO.withOrder },
    });
    expect(prismaService.picture.update).toHaveBeenNthCalledWith(2, {
      where: { id: userStub().pictures[1].id },
      data: { order: MIX_PICTURES_DTO.mixOrder },
    });
  });

  it('should return a user', async () => {
    expect(user).toEqual(userStub());
  });
});
