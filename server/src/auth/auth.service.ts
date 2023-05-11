import * as bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { UserDto, CreateUserDto } from '../users/dto';
import { LoginUserDto, UserTokenDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly mailService: MailService,
  ) {}

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.getByEmail(createUserDto.email);
    if (candidate) {
      throw new BadRequestException('User already exists');
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 7);
    const activationLink = v4();

    const user = await this.usersService.create({
      ...createUserDto,
      password: hashPassword,
    });

    await this.mailService
      .sendMail(
        createUserDto.email,
        `${process.env.API_URL}/apiactivate/${activationLink}`,
        createUserDto.name,
      )
      .catch(() => {
        throw new BadRequestException('This email does not exist');
      });

    const userTokenDto = new UserTokenDto({ id: user.id, email: user.email });
    const tokens = this.tokensService.generateTokens({ ...userTokenDto });
    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.getByEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException('The user with such an email is not found');
    }

    const isPassEquals = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPassEquals) {
      throw new ForbiddenException('Incorrect password');
    }

    const userDto = new UserDto(user);
    const userTokenDto = new UserTokenDto({ id: user.id, email: user.email });
    const tokens = this.tokensService.generateTokens({ ...userTokenDto });
    await this.tokensService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const token = await this.tokensService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('You are not authorized');
    }
    const userData = this.tokensService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokensService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException('You are not authorized');
    }

    const user = await this.usersService.getOne(userData.id);

    const userTokenDto = new UserTokenDto({ id: user.id, email: user.email });

    const tokens = this.tokensService.generateTokens({ ...userTokenDto });
    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }
}
