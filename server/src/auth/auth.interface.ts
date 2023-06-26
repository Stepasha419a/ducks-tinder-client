import { UserDto } from 'users/dto';

export interface UserData {
  user: UserDto;
  accessToken: string;
}

export interface AuthDataReturn {
  data: UserData;
  refreshToken: string;
}
