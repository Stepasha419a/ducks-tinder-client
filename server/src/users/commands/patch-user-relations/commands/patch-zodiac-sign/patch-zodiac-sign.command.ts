import { NotValidatedUserDto } from 'users/dto';

export class PatchZodiacSignCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly zodiacSign: string | null,
  ) {}
}
