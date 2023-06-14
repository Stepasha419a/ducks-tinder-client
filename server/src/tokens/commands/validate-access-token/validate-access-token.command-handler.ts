import { JwtService } from '@nestjs/jwt';
import { ValidateAccessTokenCommand } from './validate-access-token.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';

@CommandHandler(ValidateAccessTokenCommand)
export class ValidateAccessTokenCommandHandler
  implements ICommandHandler<ValidateAccessTokenCommand>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: ValidateAccessTokenCommand) {
    try {
      const { token } = command;

      const userData = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      return userData;
    } catch (error) {
      return null;
    }
  }
}
