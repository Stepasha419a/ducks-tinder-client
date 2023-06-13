import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveTokenCommand } from './remove-token.command';
import { UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(RemoveTokenCommand)
export class RemoveTokenCommandHandler
  implements ICommandHandler<RemoveTokenCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: RemoveTokenCommand) {
    const { refreshToken } = command;

    const existingRefreshToken = await this.prismaService.token.findUnique({
      where: { refreshToken },
    });
    if (!existingRefreshToken) {
      throw new UnauthorizedException();
    }

    const tokenData = await this.prismaService.token.delete({
      where: { refreshToken },
    });
    return tokenData;
  }
}
