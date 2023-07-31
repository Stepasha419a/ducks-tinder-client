import type { ButtonHTMLAttributes } from 'react';

type VariantType = 'default' | 'gradient' | 'mark';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType;
  extraClassName?: string | string[];
  border?: boolean;
  rounded?: boolean;
}
