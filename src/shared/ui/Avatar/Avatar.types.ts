type SizeType = 's' | 'm' | 'l' | 'xl';

export interface AvatarProps {
  size?: SizeType;
  userId?: string;
  extraClassName?: string;
  avatarUrl?: string;
}
