import type { InputHTMLAttributes } from 'react';

type VariantType = 'rounded' | 'low-rounded' | 'default';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantType;
  extraClassName?: string;
}
