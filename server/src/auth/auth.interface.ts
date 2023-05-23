import { UserDto } from 'users/dto';

export interface UserData {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}
