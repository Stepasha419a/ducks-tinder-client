import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import {
  faArrowRightLong,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './LoginForm.module.scss';
import { AuthLayout, useAuthForm } from '@entities/user';
import { Button, TextField } from '@ducks-tinder-client/ui';
import { COMMON_LIB_SETTINGS } from '@ducks-tinder-client/common';

export const LoginForm = (): ReactElement => {
  const {
    fields: { email, password },
    validation: { errors, isValid },
    submitHandler,
    disabled,
  } = useAuthForm();

  return (
    <AuthLayout
      errors={errors}
      title={COMMON_LIB_SETTINGS.TEXTS.auth.memberLogin}
      link={
        <Link className={styles.link} to="/reg">
          {COMMON_LIB_SETTINGS.TEXTS.auth.create}
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
          disabled={!isValid || disabled}
          extraClassName={[
            styles.btn,
            isValid && !disabled ? '' : styles.disabled,
          ]}
        >
          {COMMON_LIB_SETTINGS.TEXTS.auth.login}
        </Button>
      </form>
    </AuthLayout>
  );
};
