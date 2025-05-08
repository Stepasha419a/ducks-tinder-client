type SizeType = 's' | 'm' | 'l' | 'xl';

export interface AvatarProps {
  size?: SizeType;
  extraClassName?: string;
  avatarUrl?: string;
}
