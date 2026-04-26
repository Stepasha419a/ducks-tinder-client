import type { SubmitEventHandler } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { RegistrationParams } from '@ducks-tinder-client/common';
import {
  EMAIL_REGEXP,
  loginThunk,
  registerThunk,
  useAppDispatch,
} from '@ducks-tinder-client/common';
import type { TextFieldProps } from '@ducks-tinder-client/ui';
import { useTranslation } from 'react-i18next';

interface AuthFormReturn {
  fields: {
    email: TextFieldProps;
    password: TextFieldProps;
    name?: TextFieldProps;
  };
  validation: {
    errors: FieldErrors<RegistrationParams>;
    isValid: boolean;
  };
  submitHandler: SubmitEventHandler<HTMLFormElement>;
}

export function useAuthForm(isRegisterForm?: boolean): AuthFormReturn {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<RegistrationParams>({ mode: 'onChange' });

  const submitHandler = handleSubmit((data: RegistrationParams) => {
    if (isRegisterForm) {
      dispatch(registerThunk(data));
    } else {
      dispatch(loginThunk(data));
    }
  });

  const emailFieldProps = {
    type: 'text',
    placeholder: t('auth.email'),
    ...register('email', {
      required: t('auth.emailRequired'),
      pattern: { value: EMAIL_REGEXP, message: t('auth.emailIncorrect') },
      maxLength: {
        value: 30,
        message: t('auth.emailLengthMax', { count: 30 }),
      },
    }),
  };

  const passwordFieldProps = {
    type: 'password',
    placeholder: t('auth.password'),
    ...register('password', {
      required: t('auth.passwordRequired'),
      minLength: {
        value: 6,
        message: t('auth.passwordLengthMin', { count: 6 }),
      },
      maxLength: {
        value: 30,
        message: t('auth.passwordLengthMax', { count: 30 }),
      },
    }),
  };

  const props: AuthFormReturn = {
    fields: {
      email: emailFieldProps,
      password: passwordFieldProps,
    },
    validation: {
      errors,
      isValid,
    },
    submitHandler,
  };

  if (isRegisterForm) {
    props.fields.name = {
      type: 'text',
      placeholder: t('auth.name'),
      ...register('name', {
        required: t('auth.nameRequired'),
        minLength: {
          value: 2,
          message: t('auth.nameLengthMin', { count: 2 }),
        },
        maxLength: {
          value: 14,
          message: t('auth.nameLengthMax', { count: 14 }),
        },
      }),
    };
  }

  return props;
}
