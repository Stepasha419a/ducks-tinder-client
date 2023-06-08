import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'test/users/mocks';
import { UserDto } from 'users/dto';
import { requestUserStub, userStub } from 'test/users/stubs';
import { UsersSelector } from 'users/users.selector';
import { MixPicturesHandler } from './mix-pictures.handler';
import { MixPicturesCommand } from './mix-pictures.command';
import { MIX_PICTURES_DTO } from 'test/users/values/users.const.dto';

describe('when mix pictures is called', () => {
  let prismaService: PrismaService;
  let mixPicturesHandler: MixPicturesHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MixPicturesHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    mixPicturesHandler = moduleRef.get<MixPicturesHandler>(MixPicturesHandler);
  });

  let user: UserDto;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    user = await mixPicturesHandler.execute(
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
