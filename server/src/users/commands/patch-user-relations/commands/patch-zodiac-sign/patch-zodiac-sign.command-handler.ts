import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchZodiacSignCommand } from './patch-zodiac-sign.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchZodiacSignCommand)
export class PatchZodiacSignCommandHandler
  implements ICommandHandler<PatchZodiacSignCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchZodiacSignCommand): Promise<void> {
    const { user, zodiacSign } = command;

    if (zodiacSign === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          zodiacSign: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.zodiacSign.findUnique({
      where: { name: zodiacSign },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.zodiacSign) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          zodiacSign: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        zodiacSign: { connect: { name: zodiacSign } },
      },
    });
  }
}
