import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import {
  faArrowRightLong,
  faEnvelope,
  faFileText,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, TextField } from '@ducks-tinder-client/ui';

import { AuthLayout, useAuthForm } from '@entities/user';

import styles from './RegistrationForm.module.scss';

export const RegistrationForm = (): ReactElement => {
  const {
    fields: { name, email, password },
    validation: { errors, isValid },
    submitHandler,
  } = useAuthForm(true);

  return (
    <AuthLayout
      errors={errors}
      title="Member Sign Up"
      link={
        <Link className={styles.link} to="/login">
          Log in your Account
          <FontAwesomeIcon className={styles.icon} icon={faArrowRightLong} />
        </Link>
      }
    >
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.inputWrapper}>
          <TextField
            {...name}
            extraClassName={styles.input}
            variant="rounded"
          />
          <FontAwesomeIcon className={styles.icon} icon={faFileText} />
        </div>
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
          Sign up
        </Button>
      </form>
    </AuthLayout>
  );
};
