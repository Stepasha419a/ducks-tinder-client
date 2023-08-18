import { NotValidatedUserDto } from 'users/dto';
import { MixPicturesDto } from './../../dto/mix-pictures.dto';

export class MixPicturesCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly dto: MixPicturesDto,
  ) {}
}
