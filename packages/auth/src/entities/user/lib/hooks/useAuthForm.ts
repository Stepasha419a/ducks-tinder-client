import type { SubmitEventHandler } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { COMMON_LIB_SETTINGS, EMAIL_REGEXP } from '@ducks-tinder-client/common';
import type { TextFieldProps } from '@ducks-tinder-client/ui';
import { useLoginMutation, useRegisterMutation } from '@entities/user/api';
import type { RegistrationParams } from '@shared/api';

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
  disabled: boolean;
}

export function useAuthForm(isRegisterForm?: boolean): AuthFormReturn {
  const { mutateAsync: mutateLoginAsync, isPending: isPendingLogin } =
    useLoginMutation();
  const { mutateAsync: mutateRegisterAsync, isPending: isPendingRegister } =
    useRegisterMutation();

  const disabled = isPendingLogin || isPendingRegister;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<RegistrationParams>({ mode: 'onChange' });

  const submitHandler = handleSubmit(async (data: RegistrationParams) => {
    if (isRegisterForm) {
      await mutateRegisterAsync(data);
    } else {
      await mutateLoginAsync(data);
    }
  });

  const emailFieldProps = {
    type: 'text',
    placeholder: COMMON_LIB_SETTINGS.TEXTS.auth.email,
    ...register('email', {
      required: COMMON_LIB_SETTINGS.TEXTS.auth.emailRequired,
      pattern: {
        value: EMAIL_REGEXP,
        message: COMMON_LIB_SETTINGS.TEXTS.auth.emailIncorrect,
      },
      maxLength: {
        value: 30,
        message: COMMON_LIB_SETTINGS.TEXTS.auth.getEmailLengthMax(30),
      },
    }),
  };

  const passwordFieldProps = {
    type: 'password',
    placeholder: COMMON_LIB_SETTINGS.TEXTS.auth.password,
    ...register('password', {
      required: COMMON_LIB_SETTINGS.TEXTS.auth.passwordRequired,
      minLength: {
        value: 6,
        message: COMMON_LIB_SETTINGS.TEXTS.auth.getPasswordLengthMin(6),
      },
      maxLength: {
        value: 30,
        message: COMMON_LIB_SETTINGS.TEXTS.auth.getPasswordLengthMax(30),
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
    disabled,
  };

  if (isRegisterForm) {
    props.fields.name = {
      type: 'text',
      placeholder: COMMON_LIB_SETTINGS.TEXTS.auth.name,
      ...register('name', {
        required: COMMON_LIB_SETTINGS.TEXTS.auth.nameRequired,
        minLength: {
          value: 2,
          message: COMMON_LIB_SETTINGS.TEXTS.auth.getNameLengthMin(2),
        },
        maxLength: {
          value: 14,
          message: COMMON_LIB_SETTINGS.TEXTS.auth.getNameLengthMax(14),
        },
      }),
    };
  }

  return props;
}
