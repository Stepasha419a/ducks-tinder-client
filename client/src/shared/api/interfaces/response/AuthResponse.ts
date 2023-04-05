import type { User } from '../../../../models/User/User';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
