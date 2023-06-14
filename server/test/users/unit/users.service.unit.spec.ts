import { Test } from '@nestjs/testing';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { UsersService } from 'users/users.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UserDto } from 'users/dto';
import { UsersPrismaMock, CommandBusMock, QueryBusMock } from '../mocks';
import { userStub } from '../stubs';
import { CREATE_USER_DTO } from '../values/users.const.dto';
import { CreateUserCommand } from 'users/commands';
import { GetUserByEmailQuery, GetUserQuery } from 'users/queries';

describe('users-service', () => {
  let service: UsersService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService],
      imports: [CqrsModule, PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(UsersPrismaMock())
      .overrideProvider(CommandBus)
      .useValue(CommandBusMock())
      .overrideProvider(QueryBus)
      .useValue(QueryBusMock())
      .compile();

    service = moduleRef.get<UsersService>(UsersService);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
    queryBus = moduleRef.get<QueryBus>(QueryBus);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when service is ready', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('when get user is called', () => {
    let user: UserDto;

    beforeAll(() => {
      queryBus.execute = jest.fn().mockResolvedValue(userStub());
    });

    beforeEach(async () => {
      user = await service.getUser(userStub().id);
    });

    it('should call command bus execute', () => {
      expect(queryBus.execute).toBeCalledTimes(1);
      expect(queryBus.execute).toBeCalledWith(new GetUserQuery(userStub().id));
    });

    it('should return a short user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when get by email is called', () => {
    let user: User;

    beforeAll(() => {
      queryBus.execute = jest.fn().mockResolvedValue(userStub());
    });

    beforeEach(async () => {
      user = await service.getUserByEmail(userStub().email);
    });

    it('should call command bus execute', () => {
      expect(queryBus.execute).toBeCalledTimes(1);
      expect(queryBus.execute).toBeCalledWith(
        new GetUserByEmailQuery(userStub().email),
      );
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('when create user is called', () => {
    let user: UserDto;

    beforeAll(() => {
      commandBus.execute = jest.fn().mockResolvedValue(userStub());
    });

    beforeEach(async () => {
      user = await service.createUser(CREATE_USER_DTO);
    });

    it('should call command bus execute', () => {
      expect(commandBus.execute).toBeCalledTimes(1);
      expect(commandBus.execute).toBeCalledWith(
        new CreateUserCommand(CREATE_USER_DTO),
      );
    });

    it('should return a user', async () => {
      expect(user).toEqual(userStub());
    });
  });
});
