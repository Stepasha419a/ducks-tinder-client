import type { FC, PropsWithChildren } from 'react';
import type { FieldErrors, FieldError } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/constants';
import { Button } from '@shared/ui';
import type {
  SettingFieldInterestsArray,
  SettingFieldValues,
} from '@entities/setting/model';
import styles from './SettingWrapper.module.scss';
import classNames from 'classnames';
import { useMediaQuery } from '@shared/lib/hooks';

interface SettingWrapperProps {
  formName: string | null;
  isValid?: boolean;
  errors: FieldErrors<SettingFieldValues | SettingFieldInterestsArray>;
  submitHandler: () => void;
  cancelHandler: () => void;
}

const SettingWrapper: FC<PropsWithChildren<SettingWrapperProps>> = ({
  formName,
  children,
  isValid = true,
  errors,
  submitHandler,
  cancelHandler,
}) => {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const cancelUrl = isMobile ? ROUTES.settings : ROUTES.profile;

  return (
    <form onSubmit={submitHandler} className={styles.setting}>
      {Object.values(errors).map((error: FieldError) => (
        <div key={error.message} className={`${styles.name} ${styles.error}`}>
          {error.message!.toString()}
        </div>
      ))}
      <div className={styles.name}>{formName}</div>
      {children}
      <div className={styles.title}>Your {formName}</div>
      <Link onClick={cancelHandler} to={cancelUrl} className={styles.link}>
        <Button
          disabled={!isValid}
          border
          extraClassName={classNames(styles.btn, styles.noBorder)}
        >
          Cancel
        </Button>
      </Link>
      <Button
        border
        type="submit"
        disabled={!isValid}
        extraClassName={styles.btn}
      >
        Update my {formName}
      </Button>
    </form>
  );
};

export default SettingWrapper;
