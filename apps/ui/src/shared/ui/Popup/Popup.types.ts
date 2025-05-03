type SizeType = 's' | 'm' | 'l';

export interface PopupProps {
  closeHandler: () => void;
  title?: string;
  size?: SizeType;
  extraClassName?: string;
}
