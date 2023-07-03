import * as uuid from 'uuid';
import * as path from 'path';
import { writeFile } from 'fs';
import { ensureDir } from 'fs-extra';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SavePictureCommand } from './save-picture.command';

@CommandHandler(SavePictureCommand)
export class SavePictureCommandHandler
  implements ICommandHandler<SavePictureCommand>
{
  async execute(command: SavePictureCommand): Promise<string> {
    try {
      const { file, userId } = command;

      const fileName = uuid.v4() + '.jpg';
      const folderPath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        `static\\${userId}`,
      );
      await ensureDir(folderPath);

      writeFile(`${folderPath}/${fileName}`, file.buffer, () => null);

      return fileName;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
