import { Test } from '@nestjs/testing';
import { FilesModule } from 'files/files.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { FilesServiceMock, UsersPrismaMock } from 'users/test/mocks';
import { UserDto } from 'users/dto';
import { SavePictureCommandHandler } from './save-picture.command-handler';
import { requestUserStub, userDtoStub } from 'users/test/stubs';
import { SavePictureCommand } from './save-picture.command';
import { UsersSelector } from 'users/users.selector';
import { FilesService } from 'files/files.service';

describe('when save picture is called', () => {
  let prismaService: PrismaService;
  let filesService: FilesService;
  let savePictureCommandHandler: SavePictureCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SavePictureCommandHandler],
      imports: [FilesModule, PrismaModule],
    })
      .overrideProvider(FilesService)
      .useValue(FilesServiceMock())
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    filesService = moduleRef.get<FilesService>(FilesService);
    savePictureCommandHandler = moduleRef.get<SavePictureCommandHandler>(
      SavePictureCommandHandler,
    );
  });

  describe('when it is called correctly', () => {
    beforeAll(() => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue({
        ...userDtoStub(),
        pairs: [userDtoStub().firstPair],
      });
      prismaService.picture.findMany = jest.fn().mockResolvedValue([
        {
          id: '123123',
          name: '123.jpg',
          userId: userDtoStub().id,
          order: 0,
        },
        {
          id: '456456',
          name: '456.jpg',
          userId: userDtoStub().id,
          order: 1,
        },
      ]);
      filesService.savePicture = jest.fn().mockResolvedValue('picture-name');
    });

    let user: UserDto;

    beforeEach(async () => {
      jest.clearAllMocks();
      user = await savePictureCommandHandler.execute(
        new SavePictureCommand(requestUserStub(), {
          fieldname: '123123',
        } as Express.Multer.File),
      );
    });

    it('should call pictures find many', () => {
      expect(prismaService.picture.findMany).toBeCalledTimes(1);
      expect(prismaService.picture.findMany).toBeCalledWith({
        where: { userId: requestUserStub().id },
      });
    });

    it('should call find unique', async () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: userDtoStub().id },
        include: UsersSelector.selectUser(),
      });
    });

    it('should call files-service save picture', async () => {
      expect(filesService.savePicture).toBeCalledTimes(1);
      expect(filesService.savePicture).toBeCalledWith(
        { fieldname: '123123' },
        userDtoStub().id,
      );
    });

    it('should call create picture', async () => {
      expect(prismaService.picture.create).toBeCalledTimes(1);
      expect(prismaService.picture.create).toBeCalledWith({
        data: {
          name: 'picture-name',
          userId: userDtoStub().id,
          order: userDtoStub().pictures.length,
        },
      });
    });

    it('should return a user', async () => {
      expect(user).toEqual(userDtoStub());
    });
  });
});
