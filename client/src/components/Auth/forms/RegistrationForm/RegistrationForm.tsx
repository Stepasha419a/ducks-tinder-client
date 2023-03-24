import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightLong,
  faEnvelope,
  faLock,
  faFileText,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from '../AuthForm.module.scss';
import AuthLayout from '../../AuthLayout/AuthLayout';
import { Button, TextField } from '../../../../shared/ui';
import { useAuthForm } from '../../hooks';

export const RegistrationForm = () => {
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
          variant="auth"
          disabled={!isValid}
          extraClassName={[styles.btn, isValid ? '' : styles.disabled]}
        >
          Sign up
        </Button>
      </form>
    </AuthLayout>
  );
};
