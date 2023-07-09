import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';
import { UserDto } from 'users/dto';
import { MixPicturesCommand } from './mix-pictures.command';
import { PictureInterface } from 'users/users.interface';

@CommandHandler(MixPicturesCommand)
export class MixPicturesCommandHandler
  implements ICommandHandler<MixPicturesCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: MixPicturesCommand): Promise<UserDto> {
    const { user, dto } = command;

    const pictures = await this.prismaService.picture.findMany({
      where: { userId: user.id },
    });

    if (dto.pictures.length !== pictures.length) {
      throw new NotFoundException();
    }

    await Promise.all(
      dto.pictures.map((pic: PictureInterface, i) => {
        const picture = pictures.find((item) => item.name === pic.name);
        if (!picture) {
          throw new NotFoundException();
        }
        if (picture.order !== i) {
          return this.prismaService.picture.update({
            where: { id: picture.id },
            data: { order: i },
          });
        }
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
