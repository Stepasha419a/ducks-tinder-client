import { Test } from '@nestjs/testing';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersPrismaMock } from 'test/users/mocks';
import { requestUserStub, userStub } from 'test/users/stubs';
import { ReturnUserHandler } from './return-user.handler';
import { ReturnUserCommand } from './return-user.command';

describe('when like user is called', () => {
  let prismaService: PrismaService;
  let returnUserHandler: ReturnUserHandler;

  const usersPrismaMock = UsersPrismaMock();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ReturnUserHandler],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(usersPrismaMock)
      .compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    returnUserHandler = moduleRef.get<ReturnUserHandler>(ReturnUserHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    response = await returnUserHandler.execute(
      new ReturnUserCommand(requestUserStub()),
    );
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
