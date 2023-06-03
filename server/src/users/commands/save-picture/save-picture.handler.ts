import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FilesService } from 'files/files.service';
import { SavePictureCommand } from './save-picture.command';
import { UserDto } from 'users/dto';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';

@CommandHandler(SavePictureCommand)
export class SavePictureHandler implements ICommandHandler<SavePictureCommand> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly filesService: FilesService,
  ) {}

  async execute(command: SavePictureCommand): Promise<UserDto> {
    const { user, picture } = command;

    const pictures = await this.prismaService.picture.findMany({
      where: { userId: user.id },
    });

    if (pictures.length > 8) {
      throw new BadRequestException('You have max pictures count');
    }

    const fileName = await this.filesService.savePicture(picture, user.id);

    await this.prismaService.picture.create({
      data: { name: fileName, userId: user.id, order: pictures.length },
    });

    const updatedUser = await this.prismaService.user.findUnique({
      where: { id: user.id },
      include: UsersSelector.selectUser(),
    });

    return new UserDto(updatedUser);
  }
}
