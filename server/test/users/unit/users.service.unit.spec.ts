import { Test } from '@nestjs/testing';
import { UsersService } from 'users/users.service';
import { FilesService } from 'files/files.service';
import { FilesModule } from 'files/files.module';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { ShortUser } from 'users/users.interface';
import { UserDto } from 'users/dto';
import { UsersSelector } from 'users/users.selector';
import { UsersPrismaMock, FilesServiceMock } from '../mocks';
import { requestUserStub, shortUserStub, userStub } from '../stubs';
import {
  CREATE_USER_DTO,
  DELETE_PICTURE_DTO,
  DELETE_USER_PAIR_DTO,
  MIX_PICTURES_DTO,
  USER_SORTS_DATA,
} from '../values/users.const.dto';
import { GET_SORTED_FIND_FIRST_CALLED } from '../values/users.const.expect';

describe('users-service', () => {
  let service: UsersService;
  let prismaService: PrismaService;
  let filesService: FilesService;

  const usersPrismaMock = UsersPrismaMock();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService],
      imports: [FilesModule, PrismaModule],
    })
      .overrideProvider(FilesService)
      .useValue(FilesServiceMock())
      .overrideProvider(PrismaService)
      .useValue(usersPrismaMock)
      .compile();

    service = moduleRef.get<UsersService>(UsersService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    filesService = moduleRef.get<FilesService>(FilesService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when service is ready', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when get one is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await service.getOne(userStub().id);
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

  describe('when get by email is called', () => {
    let user: User;

    beforeEach(async () => {
      user = await service.getByEmail(userStub().email);
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

  describe('when get sorted is called', () => {
    let user: ShortUser;
    const oldMockFn = usersPrismaMock.user.findUnique;

    beforeAll(() => {
      usersPrismaMock.user.findUnique = jest.fn(() => {
        return { checked: [] };
      });
    });

    afterAll(() => {
      usersPrismaMock.user.findUnique = oldMockFn;
    });

    beforeEach(async () => {
      user = await service.getSorted(USER_SORTS_DATA);
    });

    it('should call checked users find many', async () => {
      expect(prismaService.checkedUsers.findMany).toBeCalledTimes(1);
      expect(prismaService.checkedUsers.findMany).toBeCalledWith({
        where: {
          OR: [
            { checkedId: shortUserStub().id },
            { wasCheckedId: shortUserStub().id },
          ],
        },
        select: {
          checked: { select: { id: true } },
          wasChecked: { select: { id: true } },
        },
      });
    });

    it('should call find first', async () => {
      expect(prismaService.user.findFirst).toBeCalledTimes(1);
      expect(prismaService.user.findFirst).toBeCalledWith(
        GET_SORTED_FIND_FIRST_CALLED,
      );
    });

    it('should return a short user', async () => {
      expect(user).toEqual(shortUserStub());
    });
  });

  describe('when create is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await service.create(CREATE_USER_DTO);
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

  describe('when save picture is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await service.savePicture(requestUserStub(), {
        fieldname: '123123',
      } as Express.Multer.File);
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
        where: { id: userStub().id },
        include: UsersSelector.selectUser(),
      });
    });

    it('should call files-service save picture', async () => {
      expect(filesService.savePicture).toBeCalledTimes(1);
      expect(filesService.savePicture).toBeCalledWith(
        { fieldname: '123123' },
        userStub().id,
      );
    });

    it('should call create picture', async () => {
      expect(prismaService.picture.create).toBeCalledTimes(1);
      expect(prismaService.picture.create).toBeCalledWith({
        data: {
          name: 'picture-name',
          userId: userStub().id,
          order: userStub().pictures.length,
        },
      });
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when delete picture is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await service.deletePicture(requestUserStub(), DELETE_PICTURE_DTO);
    });

    it('should call picture find first', async () => {
      expect(prismaService.picture.findFirst).toBeCalledTimes(1);
      expect(prismaService.picture.findFirst).toBeCalledWith({
        where: DELETE_PICTURE_DTO,
      });
    });

    it('should call files-service delete picture', async () => {
      expect(filesService.deletePicture).toBeCalledTimes(1);
      expect(filesService.deletePicture).toBeCalledWith(
        '123.jpg',
        userStub().id,
      );
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

  describe('when mix pictures is called', () => {
    let user: UserDto;

    beforeEach(async () => {
      user = await service.mixPictures(requestUserStub(), MIX_PICTURES_DTO);
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

  describe('when like user is called', () => {
    let response;

    beforeEach(async () => {
      response = await service.likeUser(requestUserStub(), '34545656');
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: '34545656' },
      });
    });

    it('should call checkedUsers find many', () => {
      expect(prismaService.checkedUsers.findMany).toBeCalledTimes(1);
      expect(prismaService.checkedUsers.findMany).toBeCalledWith({
        where: {
          OR: [{ checkedId: requestUserStub().id }, { checkedId: '34545656' }],
        },
        select: {
          checked: { select: { id: true } },
          wasChecked: { select: { id: true } },
        },
      });
    });

    it('should call user update', () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: '34545656' },
        data: {
          pairs: { connect: { id: requestUserStub().id } },
        },
      });
    });

    it('should call checkedUsers create', () => {
      expect(prismaService.checkedUsers.create).toBeCalledTimes(1);
      expect(prismaService.checkedUsers.create).toBeCalledWith({
        data: { wasCheckedId: requestUserStub().id, checkedId: '34545656' },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when dislike user is called', () => {
    let response;

    beforeEach(async () => {
      response = await service.dislikeUser(requestUserStub(), '34545656');
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: '34545656' },
      });
    });

    it('should call checkedUsers find many', () => {
      expect(prismaService.checkedUsers.findMany).toBeCalledTimes(1);
      expect(prismaService.checkedUsers.findMany).toBeCalledWith({
        where: {
          OR: [{ checkedId: requestUserStub().id }, { checkedId: '34545656' }],
        },
        select: {
          checked: { select: { id: true } },
          wasChecked: { select: { id: true } },
        },
      });
    });

    it('should call checkedUsers create', () => {
      expect(prismaService.checkedUsers.create).toBeCalledTimes(1);
      expect(prismaService.checkedUsers.create).toBeCalledWith({
        data: { wasCheckedId: requestUserStub().id, checkedId: '34545656' },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when return user is called', () => {
    let response;

    let oldUserFindUniqueMock;
    let oldCheckedUsersFindFirstMock;

    beforeAll(() => {
      oldUserFindUniqueMock = prismaService.user.findUnique;
      oldCheckedUsersFindFirstMock = prismaService.checkedUsers.findFirst;
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValue({ pairFor: [{ id: userStub().id }] });
      prismaService.checkedUsers.findFirst = jest.fn().mockResolvedValue({
        checkedId: userStub().id,
        wasCheckedId: requestUserStub().id,
      });
    });

    beforeEach(async () => {
      response = await service.returnUser(requestUserStub());
    });

    afterAll(() => {
      prismaService.user.findUnique = oldUserFindUniqueMock;
      prismaService.checkedUsers.findFirst = oldCheckedUsersFindFirstMock;
    });

    it('should call user find unique', () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: requestUserStub().id },
        select: { pairFor: { select: { id: true } } },
      });
    });

    it('should call checkedUsers find first', () => {
      expect(prismaService.checkedUsers.findFirst).toBeCalledTimes(1);
      expect(prismaService.checkedUsers.findFirst).toBeCalledWith({
        where: {
          wasCheckedId: requestUserStub().id,
          checked: { id: { notIn: [userStub().id] } },
        },
      });
    });

    it('should call checkedUsers delete', () => {
      expect(prismaService.checkedUsers.delete).toBeCalledTimes(1);
      expect(prismaService.checkedUsers.delete).toBeCalledWith({
        where: {
          checkedId_wasCheckedId: {
            checkedId: userStub().id,
            wasCheckedId: requestUserStub().id,
          },
        },
      });
    });

    it('should return undefined', () => {
      expect(response).toEqual(undefined);
    });
  });

  describe('when get pairs is called', () => {
    let pairs: ShortUser[];

    beforeEach(async () => {
      pairs = await service.getPairs(requestUserStub());
    });

    it('should call user find unique', async () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(1);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: userStub().id },
        select: {
          pairs: {
            select: UsersSelector.selectShortUser(),
          },
        },
      });
    });

    it('should return pairs', async () => {
      expect(pairs).toEqual(userStub().pairs);
    });
  });

  describe('when delete pair is called', () => {
    let pairs: ShortUser[];

    beforeEach(async () => {
      pairs = await service.deletePair(requestUserStub(), DELETE_USER_PAIR_DTO);
    });

    it('should call user find unique', async () => {
      expect(prismaService.user.findUnique).toBeCalledTimes(3);
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(1, {
        where: { id: requestUserStub().id },
        select: { pairs: { select: { id: true } } },
      });
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(2, {
        where: { id: DELETE_USER_PAIR_DTO.userPairId },
      });
      expect(prismaService.user.findUnique).toHaveBeenNthCalledWith(3, {
        where: { id: requestUserStub().id },
        select: { pairs: { select: UsersSelector.selectShortUser() } },
      });
    });

    it('should call user update', async () => {
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledWith({
        where: { id: requestUserStub().id },
        data: {
          pairs: { disconnect: { id: DELETE_USER_PAIR_DTO.userPairId } },
        },
      });
    });

    it('should return pairs', async () => {
      expect(pairs).toEqual(userStub().pairs);
    });
  });
});
