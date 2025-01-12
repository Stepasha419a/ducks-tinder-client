import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import type { FieldErrors, FieldError } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { SettingFieldValues } from '@features/SettingsBlock';
import { ROUTES } from '@shared/lib';
import { useAdaptiveMediaQuery } from '@shared/lib';
import { Button } from '@shared/ui';
import styles from './SettingWrapper.module.scss';

interface SettingFieldInterestsArray {
  input: string[];
}

interface SettingWrapperProps {
  formName: string | null;
  isValid?: boolean;
  errors: FieldErrors<SettingFieldValues | SettingFieldInterestsArray>;
  submitHandler: () => void;
}

export const SettingWrapper: FC<PropsWithChildren<SettingWrapperProps>> = ({
  formName,
  children,
  isValid = true,
  errors,
  submitHandler,
}) => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');
  const cancelUrl = isMobile ? ROUTES.SETTINGS : ROUTES.PROFILE;

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
      <Link to={cancelUrl} className={styles.link}>
        <Button border extraClassName={classNames(styles.btn, styles.noBorder)}>
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
