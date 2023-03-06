import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from '../AuthForm.module.scss';
import { Button, TextField } from '../../../ui';
import AuthLayout from '../../AuthLayout/AuthLayout';
import { useAuthForm } from '../../hooks';

export const LoginForm = () => {
  const {
    fields: { email, password },
    validation: { errors, isValid },
    submitHandler,
  } = useAuthForm();

  return (
    <AuthLayout
      errors={errors}
      title="Member Login"
      link={
        <Link className={styles.link} to="/reg">
          Create your Account
          <FontAwesomeIcon className={styles.icon} icon={faArrowRightLong} />
        </Link>
      }
    >
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.inputWrapper}>
          <TextField
            {...email}
            variant="rounded"
            extraClassName={styles.input}
          />
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>
        <div className={styles.inputWrapper}>
          <TextField
            {...password}
            variant="rounded"
            extraClassName={styles.input}
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
          Login
        </Button>
      </form>
    </AuthLayout>
  );
};
