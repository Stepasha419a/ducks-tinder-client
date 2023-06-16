import { Test } from '@nestjs/testing';
import { UserData } from 'auth/auth.interface';
import { CREATE_USER_DTO } from 'auth/test/values/auth.const.dto';
import { UsersService } from 'users/users.service';
import { TokensServiceMock, UsersServiceMock } from 'auth/test/mocks';
import { TokensService } from 'tokens/tokens.service';
import { userDataStub } from 'auth/test/stubs';
import { UsersModule } from 'users/users.module';
import { TokensModule } from 'tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';
import { userStub } from 'users/test/stubs';
import { RegisterCommand } from './register.command';
import { RegisterCommandHandler } from './register.command-handler';

describe('when registration is called', () => {
  let usersService: UsersService;
  let tokensService: TokensService;
  let registerCommandHandler: RegisterCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RegisterCommandHandler],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        UsersModule,
        TokensModule,
      ],
    })
      .overrideProvider(UsersService)
      .useValue(UsersServiceMock())
      .overrideProvider(TokensService)
      .useValue(TokensServiceMock())
      .compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    tokensService = moduleRef.get<TokensService>(TokensService);
    registerCommandHandler = moduleRef.get<RegisterCommandHandler>(
      RegisterCommandHandler,
    );

    usersService.getUserByEmail = jest.fn().mockResolvedValue(undefined);
  });

  afterAll(() => {
    usersService.getUserByEmail = jest.fn().mockResolvedValue({
      ...userStub(),
      _count: { pairFor: 0 },
      password: '$2a$07$HQtmk3r9h1Gg1YiOLO67duUs3GPDg5.KKCtPSm/152gqIALiRvs6q',
    });
  });

  let userData: UserData;

  beforeEach(async () => {
    jest.clearAllMocks();
    userData = await registerCommandHandler.execute(
      new RegisterCommand(CREATE_USER_DTO),
    );
  });

  it('should call usersService getUserByEmail', () => {
    expect(usersService.getUserByEmail).toBeCalledWith(CREATE_USER_DTO.email);
  });

  it('should call usersService create', () => {
    // password is custom with bcrypt
    expect(usersService.createUser).toBeCalledTimes(1);
  });

  it('should call tokensService generateTokens', () => {
    expect(tokensService.generateTokens).toBeCalledWith({
      id: userStub().id,
      email: userStub().email,
    });
  });

  it('should return userData', () => {
    expect(userData).toEqual(userDataStub());
  });
});
