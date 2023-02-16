import authImg from '../../../assets/images/auth/img-01.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faEnvelope,
  faLock,
  faFileText,
} from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { registerThunk } from '../../../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxStore';
import styles from './Registration.module.scss';
import { Button, TextField } from '../../ui';

export const RegistrationForm = (props: { formError: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.authPage.isAuth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState("Name can't be empty");
  const [emailError, setEmailError] = useState("Email can't be empty");
  const [passwordError, setPasswordError] = useState("Password can't be empty");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError || nameError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [emailError, passwordError, nameError]);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (!e.target.value.length) {
      setNameError("Name can't be empty");
    } else if (e.target.value.length < 2) {
      setNameError("Name can't be less than 2");
    } else {
      setNameError('');
    }
  };

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
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailError && !passwordError && !nameError) {
      dispatch(registerThunk({ email, password, name }));
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.img}>
            <img draggable={false} src={authImg} alt="IMG" />
          </div>
          <form
            onSubmit={(e) => submitHandler(e as FormEvent<HTMLFormElement>)}
            className={styles.form}
          >
            <span className={styles.title}>Member Sign Up</span>

            {props.formError && (
              <span className={styles.validation}>
                <div className={styles.error}>{props.formError}</div>
              </span>
            )}

            <span className={styles.validation}>
              {nameDirty && nameError && (
                <div className={styles.error}>{nameError}</div>
              )}
            </span>
            <div className={styles.inputWrapper}>
              <TextField
                variant="rounded"
                extraClassName={styles.input}
                name="name"
                type="text"
                placeholder="First name"
                onBlur={(e) => blurHandler(e)}
                value={name}
                onChange={(e) => nameHandler(e)}
              />
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faFileText} />
              </span>
            </div>

            <span className={styles.validation}>
              {emailDirty && emailError && (
                <div className={styles.error}>{emailError}</div>
              )}
            </span>
            <div className={styles.inputWrapper}>
              <TextField
                variant="rounded"
                extraClassName={styles.input}
                name="email"
                type="text"
                placeholder="Email"
                onBlur={(e) => blurHandler(e)}
                value={email}
                onChange={(e) => emailHandler(e)}
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
                variant="rounded"
                extraClassName={styles.input}
                name="password"
                type="password"
                placeholder="Password"
                onBlur={(e) => blurHandler(e)}
                value={password}
                onChange={(e) => passwordHandler(e)}
              />
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faLock} />
              </span>
            </div>

            <Button
              type="submit"
              variant="auth"
              disabled={!isFormValid}
              extraClassName={[styles.btn, isFormValid ? '' : styles.disabled]}
            >
              Sign up
            </Button>
            <div className={styles.login}>
              <Link className={styles.link} to="/login">
                Log in your Account &nbsp;
                <FontAwesomeIcon icon={faArrowRightLong} />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
