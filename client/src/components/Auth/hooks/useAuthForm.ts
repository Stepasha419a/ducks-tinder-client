import type { BaseSyntheticEvent, FormEventHandler } from 'react';
import { useEffect } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@hooks';
import { loginThunk, registerThunk } from '@entities/auth/model';
import { EMAIL_REGEXP } from '@shared/constants';
import type { TextFieldProps } from '@shared/ui/inputs/TextField/TextField.types';

// complicated interface, no need to use it as the truth
export interface AuthFieldValues extends BaseSyntheticEvent {
  email: string;
  password: string;
  name?: string;
}

interface AuthFormReturn {
  fields: {
    email: TextFieldProps;
    password: TextFieldProps;
    name?: TextFieldProps;
  };
  validation: {
    errors: FieldErrors<AuthFieldValues>;
    isValid: boolean;
  };
  submitHandler: FormEventHandler<HTMLFormElement>;
}

export function useAuthForm(isRegisterForm = false): AuthFormReturn {
  const dispatch = useAppDispatch();
  const formError = useAppSelector((state) => state.auth.formError);

  const {
    register,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<AuthFieldValues>({ mode: 'onChange' });

  useEffect(() => {
    if (formError) {
      setError('root', { type: 'custom', message: formError });
    }
  }, [formError, setError, errors]);

  const submitHandler = handleSubmit((data: AuthFieldValues) => {
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
        message: 'Email must be less than 30',
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
        message: 'Password must be more than 6',
      },
      maxLength: {
        value: 30,
        message: 'Password must be less than 30',
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
        minLength: { value: 2, message: 'Name must be more than 2' },
        maxLength: { value: 14, message: 'Name must be less than 14' },
      }),
    };
  }

  return props;
}
