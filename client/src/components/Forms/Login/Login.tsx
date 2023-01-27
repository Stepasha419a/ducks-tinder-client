import authImg from '../../../assets/images/auth/img-01.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { loginThunk, setFormError } from '../../../redux/authReducer';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxStore';
import styles from './Login.module.scss';
import { TextField } from '../../ui';

interface ILoginForm {
  formError: string;
}

export const LoginForm: React.FC<ILoginForm> = ({ formError }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.authPage.isAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email can't be empty");
  const [passwordError, setPasswordError] = useState("Password can't be empty");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [emailError, passwordError]);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Incorrect email');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6 || e.target.value.length > 30) {
      setPasswordError('Password has to be more 6 and less 30');
      if (!e.target.value) {
        setPasswordError("Password can't be empty");
      }
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'email':
        setEmailDirty(true);
        dispatch(setFormError(''));
        break;
      case 'password':
        setPasswordDirty(true);
        dispatch(setFormError(''));
        break;
    }
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailError && !passwordError) {
      dispatch(loginThunk({ email, password }));
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.img}>
            <img src={authImg} alt="IMG" />
          </div>
          <form
            onSubmit={(e) => submitHandler(e as FormEvent<HTMLFormElement>)}
            className={styles.form}
          >
            <span className={styles.title}>Member Login</span>

            {formError && (
              <span className={styles.validation}>
                <div className={styles.error}>{formError}</div>
              </span>
            )}

            <span className={styles.validation}>
              {emailDirty && emailError && (
                <div className={styles.error}>{emailError}</div>
              )}
            </span>
            <div className={styles.inputWrapper}>
              <TextField
                type="text"
                name="email"
                variant="rounded"
                placeholder="Email"
                onBlur={(e) => blurHandler(e)}
                value={email}
                onChange={(e) => emailHandler(e)}
                extraClassName={styles.input}
              />
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>

            <span className={styles.validation}>
              {passwordDirty && passwordError && (
                <div className={styles.error}>{passwordError}</div>
              )}
            </span>
            <div className={styles.inputWrapper}>
              <TextField
                type="password"
                name="password"
                variant="rounded"
                placeholder="Password"
                onBlur={(e) => blurHandler(e)}
                value={password}
                onChange={(e) => passwordHandler(e)}
                extraClassName={styles.input}
              />
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faLock} />
              </span>
            </div>

            <div className={styles.submit}>
              <button
                disabled={!isFormValid}
                type="submit"
                className={
                  `${styles.btn} ` + (isFormValid ? '' : styles.btn_disabled)
                }
              >
                Login
              </button>
            </div>
            <div className={styles.registration}>
              <Link className={styles.link} to="/reg">
                Create your Account &nbsp;
                <FontAwesomeIcon icon={faArrowRightLong} />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
