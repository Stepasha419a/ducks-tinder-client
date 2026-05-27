import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import {
  faArrowRightLong,
  faEnvelope,
  faFileText,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AuthLayout, useAuthForm } from '@entities/user';

import styles from './RegistrationForm.module.scss';
import { Button, TextField } from '@ducks-tinder-client/ui';
import { COMMON_LIB_SETTINGS } from '@ducks-tinder-client/common';

export const RegistrationForm = (): ReactElement => {
  const {
    fields: { name, email, password },
    validation: { errors, isValid },
    submitHandler,
    disabled,
  } = useAuthForm(true);

  return (
    <AuthLayout
      errors={errors}
      title={COMMON_LIB_SETTINGS.TEXTS.auth.memberSignUp}
      link={
        <Link className={styles.link} to="/login">
          {COMMON_LIB_SETTINGS.TEXTS.auth.loginAccount}
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
          disabled={!isValid || disabled}
          extraClassName={[
            styles.btn,
            isValid && !disabled ? '' : styles.disabled,
          ]}
        >
          {COMMON_LIB_SETTINGS.TEXTS.auth.signUp}
        </Button>
      </form>
    </AuthLayout>
  );
};
