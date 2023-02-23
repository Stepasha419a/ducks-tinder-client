import { PropsWithChildren } from 'react';
import { Button } from '../../../../ui';
import styles from './SettingWrapper.module.scss';

interface SettingWrapperProps {
  submitSettings: () => void;
  cancelHandler: () => void;
  formName: string;
  inputValueDirty: boolean;
  inputValueError: string;
  isFormValid: boolean;
  isFormCloseable: boolean;
}

const SettingWrapper: React.FC<PropsWithChildren<SettingWrapperProps>> = ({
  submitSettings,
  cancelHandler,
  formName,
  children,
  inputValueDirty,
  inputValueError,
  isFormValid,
  isFormCloseable,
}) => {
  return (
    <div className={styles.setting}>
      {inputValueDirty && inputValueError && (
        <div className={`${styles.name} ${styles.name_error}`}>
          {inputValueError}
        </div>
      )}
      <div className={styles.name}>{formName}</div>
      <div className={styles.content}>{children}</div>
      <div className={styles.title}>Your {formName}</div>
      <Button
        disabled={!isFormCloseable}
        onClick={() => cancelHandler()}
        variant="setting"
        extraClassName={styles.noBorder}
      >
        Cancel
      </Button>
      <Button
        disabled={!isFormValid}
        onClick={() => submitSettings()}
        variant="setting"
      >
        Update my {formName}
      </Button>
    </div>
  );
};

export default SettingWrapper;
