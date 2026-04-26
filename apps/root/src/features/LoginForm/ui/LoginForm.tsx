import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import {
  faArrowRightLong,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, TextField } from '@ducks-tinder-client/ui';

import { AuthLayout, useAuthForm } from '@entities/user';

import * as styles from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';

export const LoginForm = (): ReactElement => {
  const { t } = useTranslation();

  const {
    fields: { email, password },
    validation: { errors, isValid },
    submitHandler,
  } = useAuthForm();

  return (
    <AuthLayout
      errors={errors}
      title={t('auth.memberLogin')}
      link={
        <Link className={styles.link} to="/reg">
          {t('auth.create')}
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
          {t('auth.login')}
        </Button>
      </form>
    </AuthLayout>
  );
};
