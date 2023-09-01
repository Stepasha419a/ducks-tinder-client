import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchAttentionSignCommand } from './patch-attention-sign.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchAttentionSignCommand)
export class PatchAttentionSignCommandHandler
  implements ICommandHandler<PatchAttentionSignCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchAttentionSignCommand): Promise<void> {
    const { user, attentionSign } = command;

    if (attentionSign === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          attentionSign: { disconnect: true },
        },
      });

      return;
    }

    const candidate = await this.prismaService.attentionSign.findUnique({
      where: { name: attentionSign },
    });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.attentionSign) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          attentionSign: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        attentionSign: { connect: { name: attentionSign } },
      },
    });
  }
}
