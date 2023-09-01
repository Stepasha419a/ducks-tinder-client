import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PatchSocialNetworksActivityCommand } from './patch-social-networks-activity.command';
import { PrismaService } from 'prisma/prisma.service';

@CommandHandler(PatchSocialNetworksActivityCommand)
export class PatchSocialNetworksActivityCommandHandler
  implements ICommandHandler<PatchSocialNetworksActivityCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PatchSocialNetworksActivityCommand): Promise<void> {
    const { user, socialNetworksActivity } = command;

    if (socialNetworksActivity === null) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          socialNetworksActivity: { disconnect: true },
        },
      });

      return;
    }

    const candidate =
      await this.prismaService.socialNetworksActivity.findUnique({
        where: { name: socialNetworksActivity },
      });
    if (!candidate) {
      throw new NotFoundException();
    }

    if (user.socialNetworksActivity) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          socialNetworksActivity: { disconnect: true },
        },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        socialNetworksActivity: { connect: { name: socialNetworksActivity } },
      },
    });
  }
}
