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

import * as styles from './RegistrationForm.module.scss';
import { useTranslation } from 'react-i18next';

export const RegistrationForm = (): ReactElement => {
  const { t } = useTranslation();

  const {
    fields: { name, email, password },
    validation: { errors, isValid },
    submitHandler,
  } = useAuthForm(true);

  return (
    <AuthLayout
      errors={errors}
      title={t('auth.memberSignUp')}
      link={
        <Link className={styles.link} to="/login">
          {t('auth.loginAccount')}
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
          {t('auth.signUp')}
        </Button>
      </form>
    </AuthLayout>
  );
};
