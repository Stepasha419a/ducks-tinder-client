import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { loginThunk, registerThunk } from '../../../redux/auth/auth.thunks';
import { EMAIL_REGEXP } from '../constants';

export interface AuthFieldValues {
  email: string;
  password: string;
  name?: string;
}

export function useAuthForm(isRegisterForm: boolean = false) {
  const dispatch = useAppDispatch();
  const formError = useAppSelector((state) => state.authPage.formError);

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

  const nameFieldProps = isRegisterForm && {
    type: 'text',
    placeholder: 'First name',
    ...register('name', {
      required: 'Name is required',
      minLength: { value: 2, message: 'Name must be more than 2' },
      maxLength: { value: 14, message: 'Name must be less than 14' },
    }),
  };

  return {
    fields: {
      email: emailFieldProps,
      password: passwordFieldProps,
      name: nameFieldProps,
    },
    validation: {
      errors,
      isValid,
    },
    submitHandler,
  };
}
