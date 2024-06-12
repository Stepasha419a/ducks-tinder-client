import {
  faArrowRightLong,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useAuthForm } from '@entities/user/lib';
import { AuthLayout } from '@entities/user/ui';
import { Button, TextField } from '@shared/ui';
import styles from './LoginForm.module.scss';

export const LoginForm = (): ReactElement => {
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
          <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
        </div>
        <div className={styles.inputWrapper}>
          <TextField
            {...password}
            variant="rounded"
            extraClassName={styles.input}
          />
          <FontAwesomeIcon className={styles.icon} icon={faLock} />
        </div>
        <Button
          type="submit"
          rounded
          disabled={!isValid}
          extraClassName={[styles.btn, isValid ? '' : styles.disabled]}
        >
          Login
        </Button>
      </form>
    </AuthLayout>
  );
};
