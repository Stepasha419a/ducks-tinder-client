import type { FormEventHandler } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { loginThunk, registerThunk } from '@entities/user';
import type { RegistrationParams } from '@shared/api/services';
import { EMAIL_REGEXP } from '@shared/constants';
import { useAppDispatch } from '@shared/lib/hooks';
import type { TextFieldProps } from '@shared/ui';

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
  submitHandler: FormEventHandler<HTMLFormElement>;
}

export function useAuthForm(isRegisterForm?: boolean): AuthFormReturn {
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
    placeholder: 'Email',
    ...register('email', {
      required: 'Email is required',
      pattern: { value: EMAIL_REGEXP, message: 'Incorrect email' },
      maxLength: {
        value: 30,
        message: 'Email must be less than 30 symbols',
      },
    }),
  };

  const passwordFieldProps = {
    type: 'password',
    placeholder: 'Password',
    ...register('password', {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must be more than 6 symbols',
      },
      maxLength: {
        value: 30,
        message: 'Password must be less than 30 symbols',
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
      placeholder: 'First name',
      ...register('name', {
        required: 'Name is required',
        minLength: { value: 2, message: 'Name must be more than 2 symbols' },
        maxLength: { value: 14, message: 'Name must be less than 14 symbols' },
      }),
    };
  }

  return props;
}
