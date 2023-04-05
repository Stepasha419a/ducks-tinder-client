import type { RegisterOptions } from 'react-hook-form';
import { useAppSelector } from '../../../hooks';
import { EMAIL_REGEXP } from '../../../shared/constants';
import type { Validation } from '../../../shared/interfaces';
import type { SettingFieldValues } from '../interfaces';

export function useCurrentValidation():
  | RegisterOptions<SettingFieldValues, 'input'>
  | undefined {
  const formName = useAppSelector((state) => state.settings.formName)!;
  const validation: Validation | null = useAppSelector(
    (state) => state.settings.validaton
  );

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
