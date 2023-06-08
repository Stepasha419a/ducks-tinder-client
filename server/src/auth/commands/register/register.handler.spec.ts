import { Test } from '@nestjs/testing';
import { userStub } from 'test/users/stubs';
import { RegisterHandler } from './register.handler';
import { RegisterCommand } from './register.command';
import { UserData } from 'auth/auth.interface';
import { CREATE_USER_DTO } from 'test/auth/values/auth.const.dto';
import { UsersService } from 'users/users.service';
import { TokensServiceMock, UsersServiceMock } from 'test/auth/mocks';
import { TokensService } from 'tokens/tokens.service';
import { userDataStub } from 'test/auth/stubs';
import { UsersModule } from 'users/users.module';
import { TokensModule } from 'tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';

describe('when registration is called', () => {
  let usersService: UsersService;
  let tokensService: TokensService;
  let registerHandler: RegisterHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RegisterHandler],
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
    registerHandler = moduleRef.get<RegisterHandler>(RegisterHandler);

    usersService.getByEmail = jest.fn().mockResolvedValue(undefined);
  });

  afterAll(() => {
    usersService.getByEmail = jest.fn().mockResolvedValue({
      ...userStub(),
      _count: { pairFor: 0 },
      password: '$2a$07$HQtmk3r9h1Gg1YiOLO67duUs3GPDg5.KKCtPSm/152gqIALiRvs6q',
    });
  });

  let userData: UserData;

  beforeEach(async () => {
    jest.clearAllMocks();
    userData = await registerHandler.execute(
      new RegisterCommand(CREATE_USER_DTO),
    );
  });

  it('should call usersService getByEmail', () => {
    expect(usersService.getByEmail).toBeCalledWith(CREATE_USER_DTO.email);
  });

  it('should call usersService create', () => {
    // password is custom with bcrypt
    expect(usersService.create).toBeCalledTimes(1);
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
