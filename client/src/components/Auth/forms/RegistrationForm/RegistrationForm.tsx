import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faEnvelope,
  faLock,
  faFileText,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from '../AuthForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { registerThunk } from '../../../../redux/auth/auth.thunks';
import { useForm } from 'react-hook-form';
import AuthLayout from '../../AuthLayout/AuthLayout';
import { Button, TextField } from '../../../ui';
import { EMAIL_REGEXP } from '../../constants';

interface FieldValues {
  name: string;
  email: string;
  password: string;
}

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();

  const formError = useAppSelector((state) => state.authPage.formError);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({ mode: 'onChange' });

  const submitHandler = (data: FieldValues) => {
    dispatch(registerThunk(data));
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <span className={styles.title}>Member Sign Up</span>
        <span className={styles.validation}>
          {Object.values(errors).map((error) => (
            <div className={styles.error}>{error?.message?.toString()}</div>
          ))}
          {formError && <div className={styles.error}>{formError}</div>}
        </span>
        <div className={styles.inputWrapper}>
          <TextField
            variant="rounded"
            extraClassName={styles.input}
            type="text"
            placeholder="First name"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be more than 2' },
              maxLength: { value: 14, message: 'Name must be less than 14' },
            })}
          />
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faFileText} />
          </span>
        </div>
        <div className={styles.inputWrapper}>
          <TextField
            variant="rounded"
            extraClassName={styles.input}
            type="text"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: EMAIL_REGEXP, message: 'Incorrect email' },
              maxLength: {
                value: 30,
                message: 'Email must be less than 30',
              },
            })}
          />
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>
        <div className={styles.inputWrapper}>
          <TextField
            variant="rounded"
            extraClassName={styles.input}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be more than 6',
              },
              maxLength: {
                value: 30,
                message: 'Password must be less than 30',
              },
            })}
          />
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faLock} />
          </span>
        </div>

        <Button
          type="submit"
          variant="auth"
          disabled={!isValid}
          extraClassName={[styles.btn, isValid ? '' : styles.disabled]}
        >
          Sign up
        </Button>
        <div className={styles.navigate}>
          <Link className={styles.link} to="/login">
            Log in your Account &nbsp;
            <FontAwesomeIcon icon={faArrowRightLong} />
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
