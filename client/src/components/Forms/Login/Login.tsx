import authImg from '../../../assets/images/auth/img-01.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { Button, TextField } from '../../ui';
import { loginThunk } from '../../../redux/auth/auth.thunks';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useEffect } from 'react';
import { EMAIL_REGEXP } from '../constants';

interface LoginFormProps {
  formError: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ formError }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.authPage.isAuth);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginThunk({ email: data.email, password: data.password }));
  };

  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.img}>
            <img draggable={false} src={authImg} alt="IMG" />
          </div>
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
                    message: 'Email should be less than 30',
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
                    message: 'Password should be more than 6',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Password should be less than 30',
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
            <div className={styles.registration}>
              <Link className={styles.link} to="/reg">
                Create your Account
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faArrowRightLong}
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
