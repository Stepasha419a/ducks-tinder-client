import { ICommand } from '@nestjs/cqrs';
import { User } from '@prisma/client';

export class SavePictureCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly picture: Express.Multer.File,
  ) {}
}
