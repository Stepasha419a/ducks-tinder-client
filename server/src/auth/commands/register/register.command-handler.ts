import * as bcrypt from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokensService } from 'tokens/tokens.service';
import { UsersService } from 'users/users.service';
import { UserData } from 'auth/auth.interface';
import { UserTokenDto } from 'auth/dto';
import { RegisterCommand } from './register.command';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
  implements ICommandHandler<RegisterCommand>
{
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  async execute(command: RegisterCommand): Promise<UserData> {
    const { dto } = command;

    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new BadRequestException('User already exists');
    }

    const hashPassword = await bcrypt.hash(dto.password, 7);

    const user = await this.usersService.createUser({
      ...dto,
      password: hashPassword,
    });

    const userTokenDto = new UserTokenDto({ id: user.id, email: user.email });
    const tokens = await this.tokensService.generateTokens({ ...userTokenDto });

    return { ...tokens, user };
  }
}
