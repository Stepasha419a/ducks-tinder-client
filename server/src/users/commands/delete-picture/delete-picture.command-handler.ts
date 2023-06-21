import { FilesService } from 'files/files.service';
import { PrismaService } from 'prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePictureCommand } from './delete-picture.command';
import { UserDto } from 'users/dto';
import { UsersSelector } from 'users/users.selector';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeletePictureCommand)
export class DeletePictureCommandHandler
  implements ICommandHandler<DeletePictureCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly filesService: FilesService,
  ) {}

  async execute(command: DeletePictureCommand): Promise<UserDto> {
    const { user, dto } = command;

    const picture = await this.prismaService.picture.findFirst({
      where: dto,
    });

    if (!picture) {
      throw new NotFoundException();
    }

    await this.filesService.deletePicture(picture.name, picture.userId);

    await this.prismaService.picture.delete({ where: { id: picture.id } });
    const pictures = await this.prismaService.picture.findMany({
      where: { userId: user.id },
    });

    await Promise.all(
      pictures
        .filter((pictureItem) => pictureItem.order > picture.order)
        .map(async (pictureItem) => {
          return this.prismaService.picture.update({
            where: { id: pictureItem.id },
            data: { order: pictureItem.order - 1 },
          });
        }),
    );

    const updatedUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: UsersSelector.selectUser(),
    });
    const pairsCount = await this.prismaService.user.count({
      where: { pairFor: { some: { id: user.id } } },
    });

    return new UserDto({ ...updatedUser, pairsCount });
  }
}
