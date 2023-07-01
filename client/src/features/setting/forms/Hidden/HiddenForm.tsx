import type { FC, ReactElement } from 'react';
import styles from './HiddenForm.module.scss';
import SettingWrapper from '../Wrapper/SettingWrapper';
import { useTextForm } from '../../lib';
import { useAppSelector } from '@/shared/hooks';

export const HiddenForm: FC = (): ReactElement => {
  const { formName, errors, cancelHandler } = useTextForm();
  const place = useAppSelector((state) => state.user.currentUser.place);

  return (
    <div className={styles.setting}>
      <SettingWrapper
        formName={formName}
        errors={errors}
        submitHandler={cancelHandler}
        cancelHandler={cancelHandler}
      >
        <div className={styles.place}>
          {place?.name} {place?.address}
        </div>
      </SettingWrapper>
    </div>
  );
};
