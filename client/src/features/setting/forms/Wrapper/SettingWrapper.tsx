import type { FC, PropsWithChildren } from 'react';
import type { FieldErrors, FieldError } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { Button } from '@shared/ui';
import type {
  SettingFieldInterestsArray,
  SettingFieldValues,
} from '@entities/setting/model';
import styles from './SettingWrapper.module.scss';

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
      <Link onClick={cancelHandler} to={ROUTES.profile} className={styles.link}>
        <Button
          type="button"
          disabled={!isValid}
          variant="setting"
          extraClassName={styles.noBorder}
        >
          Cancel
        </Button>
      </Link>
      <Button type="submit" disabled={!isValid} variant="setting">
        Update my {formName}
      </Button>
    </form>
  );
};

export default SettingWrapper;
