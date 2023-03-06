import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from '../AuthForm.module.scss';
import { Button, TextField } from '../../../ui';
import { loginThunk } from '../../../../redux/auth/auth.thunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEXP } from '../../constants';
import AuthLayout from '../../AuthLayout/AuthLayout';

interface FieldValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const formError = useAppSelector((state) => state.authPage.formError);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FieldValues>({ mode: 'onChange' });

  const submitHandler = (data: FieldValues) => {
    dispatch(loginThunk(data));
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <span className={styles.title}>Member Login</span>
        <div className={styles.validation}>
          {Object.values(errors).map((error) => (
            <div className={styles.error}>{error?.message?.toString()}</div>
          ))}
          {formError && <div className={styles.error}>{formError}</div>}
        </div>
        <div className={styles.inputWrapper}>
          <TextField
            type="text"
            variant="rounded"
            placeholder="Email"
            extraClassName={styles.input}
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
            type="text"
            variant="rounded"
            placeholder="Password"
            extraClassName={styles.input}
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
          disabled={!isValid}
          variant="auth"
          extraClassName={[styles.btn, isValid ? '' : styles.disabled]}
        >
          Login
        </Button>
        <div className={styles.navigate}>
          <Link className={styles.link} to="/reg">
            Create your Account
            <FontAwesomeIcon className={styles.icon} icon={faArrowRightLong} />
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
