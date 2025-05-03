import type { InputHTMLAttributes } from 'react';

type VariantType = 'full' | 'small';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantType;
  onChange: () => void;
  checked: boolean;
  text?: string;
  extraClassName?: string;
}
