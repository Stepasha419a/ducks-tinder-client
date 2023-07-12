import { ICommand } from '@nestjs/cqrs';
import { AuthorizedUser } from 'users/users.interface';

export class SavePictureCommand implements ICommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly picture: Express.Multer.File,
  ) {}
}
