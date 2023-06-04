import { User } from '@prisma/client';
import { MixPicturesDto } from './../../dto/mix-pictures.dto';

export class MixPicturesCommand {
  constructor(
    public readonly user: User,
    public readonly dto: MixPicturesDto,
  ) {}
}
