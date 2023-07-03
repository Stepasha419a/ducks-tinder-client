import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeletePictureCommand, SavePictureCommand } from './commands';

@Injectable()
export class FilesService {
  constructor(private readonly commandBus: CommandBus) {}

  async savePicture(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    return this.commandBus.execute(new SavePictureCommand(file, userId));
  }

  async deletePicture(fileName: string, userId: string): Promise<string> {
    return this.commandBus.execute(new DeletePictureCommand(fileName, userId));
  }
}
