import { PropsWithChildren } from 'react';
import { FieldErrors } from 'react-hook-form';
import { Button } from '../../../../ui';
import { SettingFieldValues } from '../../../interfaces';
import styles from './SettingWrapper.module.scss';

interface SettingWrapperProps {
  formName: string | null;
  isValid: boolean;
  errors: FieldErrors<SettingFieldValues>;
  submitHandler: () => void;
  cancelHandler: () => void;
}

const SettingWrapper: React.FC<PropsWithChildren<SettingWrapperProps>> = ({
  formName,
  children,
  isValid,
  errors,
  submitHandler,
  cancelHandler,
}) => {
  return (
    <form onSubmit={submitHandler} className={styles.setting}>
      {Object.values(errors).map((error) => (
        <div className={`${styles.name} ${styles.error}`}>
          {error.message!.toString()}
        </div>
      ))}
      <div className={styles.name}>{formName}</div>
      {children}
      <div className={styles.title}>Your {formName}</div>
      <Button
        disabled={!isValid}
        onClick={cancelHandler}
        variant="setting"
        extraClassName={styles.noBorder}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={!isValid} variant="setting">
        Update my {formName}
      </Button>
    </form>
  );
};

export default SettingWrapper;