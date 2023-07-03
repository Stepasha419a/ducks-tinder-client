import * as path from 'path';
import { unlinkSync } from 'fs';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePictureCommand } from './delete-picture.command';

@CommandHandler(DeletePictureCommand)
export class DeletePictureCommandHandler
  implements ICommandHandler<DeletePictureCommand>
{
  async execute(command: DeletePictureCommand): Promise<string> {
    try {
      const { fileName, userId } = command;
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        `static\\${userId}`,
        fileName,
      );

      unlinkSync(filePath);

      return fileName;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
