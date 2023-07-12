import { AuthorizedUser } from 'users/users.interface';
import { MixPicturesDto } from './../../dto/mix-pictures.dto';

export class MixPicturesCommand {
  constructor(
    public readonly user: AuthorizedUser,
    public readonly dto: MixPicturesDto,
  ) {}
}
