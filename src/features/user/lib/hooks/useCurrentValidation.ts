import type { RegisterOptions } from 'react-hook-form';
import { EMAIL_REGEXP } from '@shared/constants';
import { useSettingUrl } from '../../../../entities/user/lib/hooks/useSettingUrl';

export interface SettingFieldValues {
  input: string;
}

export function useCurrentValidation():
  | RegisterOptions<SettingFieldValues, 'input'>
  | undefined {
  const setting = useSettingUrl();

  if (!setting) {
    return undefined;
  }

  const { formName, validation } = setting;

  return {
    required: `${formName} is required`,
    minLength: validation?.min
      ? {
          value: validation.min,
          message: `${formName} must be more than ${validation.min}`,
        }
      : undefined,
    maxLength: validation?.max
      ? {
          value: validation.max,
          message: `${formName} must be less than ${validation.max}`,
        }
      : undefined,
    pattern: validation?.email
      ? {
          value: EMAIL_REGEXP,
          message: 'Incorrect email',
        }
      : undefined,
  };
}
