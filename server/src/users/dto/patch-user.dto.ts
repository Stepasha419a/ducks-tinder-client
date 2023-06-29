export class PatchUserDto {
  email?: string;
  name?: string;
  description?: string;
  nickname?: string;
  isActivated?: boolean;
  age?: number;
  sex?: string;
  distance?: number;
  usersOnlyInDistance?: boolean;
  preferSex?: 'male' | 'female' | '';
  preferAgeFrom?: number;
  preferAgeTo?: number;
  interests?: string[];
}
