import type { FC, ReactElement } from 'react';
import { useAppSelector } from '@shared/lib/hooks';
import SettingWrapper from '../Wrapper/SettingWrapper';
import styles from './ExternalForm.module.scss';
import { useExternalForm } from '@features/setting/lib/hooks';

export const ExternalForm: FC = (): ReactElement => {
  const { formName, errors, submitHandler, cancelHandler } = useExternalForm();
  const place = useAppSelector((state) => state.user.currentUser.place);

  return (
    <div className={styles.setting}>
      <SettingWrapper
        formName={formName}
        errors={errors}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      >
        <div className={styles.place}>
          {place?.name} {place?.address}
        </div>
      </SettingWrapper>
    </div>
  );
};
