type SizeType = 's' | 'm';

export interface AvatarProps {
  size?: SizeType;
  userId?: string;
  extraClassName?: string;
  avatarUrl?: string;
}
