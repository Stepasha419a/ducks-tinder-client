import type { ButtonHTMLAttributes } from 'react';

type VariantType =
  | 'gradient'
  | 'default'
  | 'setting'
  | 'auth'
  | 'closePopup'
  | 'mark'
  | 'tinder';

type SizeType = 'small' | 'large';

type ColorType = 'gold' | 'red' | 'blue' | 'green' | 'purple';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType;
  extraClassName?: string | string[];
  size?: SizeType;
  color?: ColorType;
}
