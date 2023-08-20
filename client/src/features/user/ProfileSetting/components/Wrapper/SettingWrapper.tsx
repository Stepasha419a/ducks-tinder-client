import type { FC, PropsWithChildren } from 'react';
import type { FieldErrors, FieldError } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ROUTES } from '@shared/constants';
import { Button } from '@shared/ui';
import { useMediaQuery } from '@/shared/lib/hooks';
import styles from './SettingWrapper.module.scss';

interface SettingWrapperProps {
  formName: string | null;
  isValid?: boolean;
  errors: FieldErrors;
  submitHandler: () => void;
  cancelHandler: () => void;
}

export const SettingWrapper: FC<PropsWithChildren<SettingWrapperProps>> = ({
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
      {Object.values(errors).map((error) => {
        const message = error!.message as FieldError;
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        const text = message.toString();

        return (
          <div key={text} className={`${styles.name} ${styles.error}`}>
            {text}
          </div>
        );
      })}
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
