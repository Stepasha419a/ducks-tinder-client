import { Test } from '@nestjs/testing';
import { FilesModule } from 'files/files.module';
import { ShortUser } from 'users/users.interface';
import { FilesService } from 'files/files.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { FilesServiceMock, UsersPrismaMock } from 'test/users/mocks';
import { DELETE_PICTURE_DTO } from 'test/users/values/users.const.dto';
import { DeletePictureHandler } from './delete-picture.handler';
import { DeletePictureCommand } from './delete-picture.command';
import { requestUserStub, userStub } from 'test/users/stubs';
import { UsersSelector } from 'users/users.selector';

describe('when delete picture is called', () => {
  let prismaService: PrismaService;
  let filesService: FilesService;
  let deletePictureHandler: DeletePictureHandler;

  let user: ShortUser;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DeletePictureHandler],
      imports: [FilesModule, PrismaModule],
    })
      .overrideProvider(FilesService)
      .useValue(FilesServiceMock())
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    filesService = moduleRef.get<FilesService>(FilesService);
    deletePictureHandler =
      moduleRef.get<DeletePictureHandler>(DeletePictureHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    user = await deletePictureHandler.execute(
      new DeletePictureCommand(requestUserStub(), DELETE_PICTURE_DTO),
    );
  });

  it('should call picture find first', async () => {
    expect(prismaService.picture.findFirst).toBeCalledTimes(1);
    expect(prismaService.picture.findFirst).toBeCalledWith({
      where: DELETE_PICTURE_DTO,
    });
  });

  it('should call files-service delete picture', async () => {
    expect(filesService.deletePicture).toBeCalledTimes(1);
    expect(filesService.deletePicture).toBeCalledWith('123.jpg', userStub().id);
  });

  it('should call picture delete', async () => {
    expect(prismaService.picture.delete).toBeCalledTimes(1);
    expect(prismaService.picture.delete).toBeCalledWith({
      where: { id: userStub().pictures[0].id },
    });
  });

  it('should call picture update', async () => {
    expect(prismaService.picture.update).toBeCalledTimes(1);
    expect(prismaService.picture.update).toBeCalledWith({
      where: { id: userStub().pictures[1].id },
      data: { order: 0 },
    });
  });

  it('should call user find unique', async () => {
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
