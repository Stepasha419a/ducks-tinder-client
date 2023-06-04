import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';
import { UserDto } from 'users/dto';
import { MixPicturesCommand } from './mix-pictures.command';

@CommandHandler(MixPicturesCommand)
export class MixPicturesHandler implements ICommandHandler<MixPicturesCommand> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: MixPicturesCommand) {
    const { user, dto } = command;

    const pictures = await this.prismaService.picture.findMany({
      where: { userId: user.id },
    });

    const mixPicture = pictures.find((pic) => pic.order === dto.mixOrder);
    const withPicture = pictures.find((pic) => pic.order === dto.withOrder);
    if (!mixPicture || !withPicture) {
      throw new NotFoundException();
    }

    await this.prismaService.picture.update({
      where: { id: mixPicture.id },
      data: { order: dto.withOrder },
    });
    await this.prismaService.picture.update({
      where: { id: withPicture.id },
      data: { order: dto.mixOrder },
    });

    const updatedUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: UsersSelector.selectUser(),
    });

    return new UserDto(updatedUser);
  }
}
