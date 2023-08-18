import { DeletePictureDto, NotValidatedUserDto } from 'users/dto';

export class DeletePictureCommand {
  constructor(
    public readonly user: NotValidatedUserDto,
    public readonly dto: DeletePictureDto,
  ) {}
}
