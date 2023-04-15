import type { FC } from 'react';
import { useState } from 'react';
import { useAppSelector } from '@hooks';
import type {
  ChangedData,
  InnerObjectName,
  SettingInputName,
} from '@shared/api/interfaces';
import type { Validation } from '@shared/interfaces';
import { RangeInput, SettingThumbnail, SettingsGroup } from '@shared/ui';
import styles from './SettingsGroup.module.scss';

interface AccountProps {
  setInputHandler: (
    inputName: SettingInputName,
    validation?: Validation | null,
    innerObjectName?: InnerObjectName,
    formName?: string
  ) => void;
  updateInputHandler: (
    inputName: SettingInputName,
    changedData: ChangedData,
    innerObjectName?: InnerObjectName
  ) => void;
}

export const Account: FC<AccountProps> = ({
  setInputHandler,
  updateInputHandler,
}) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const errorFields = useAppSelector((state) => state.setting.errorFields);

  const [ageSetting, setAgeSetting] = useState(currentUser.age);

  const ageSubmitHandler = (): void => {
    updateInputHandler('age', ageSetting);
  };

  const setEmailHandler = (): void => {
    setInputHandler('email', { min: 0, max: 40, email: true });
  };
  const setNameHandler = (): void => {
    setInputHandler('name', { min: 2, max: 14 });
  };
  const setDescriptionHandler = (): void => {
    setInputHandler('description', { min: 50, max: 400 });
  };
  const setSexHandler = (): void => {
    setInputHandler('sex');
  };

  return (
    <SettingsGroup
      title="Account Settings"
      descr="Verified email address helps to protect your account"
    >
      <SettingThumbnail
        clickHandler={setEmailHandler}
        title="Email"
        value={currentUser.email}
        isPointer
      />
      <SettingThumbnail
        clickHandler={setNameHandler}
        title="Name"
        value={currentUser.name}
        isPointer
      />
      <SettingThumbnail
        clickHandler={setDescriptionHandler}
        title="Description"
        value={currentUser.description || 'Empty description'}
        isPointer
        isError={errorFields.includes('description')}
        isOverflow
      />
      <SettingThumbnail
        clickHandler={setSexHandler}
        title="Sex"
        value={currentUser.sex}
        isPointer
      />
      <SettingThumbnail title="Age" value={`${ageSetting} years old`}>
        <div className={styles.slider}>
          <RangeInput
            value={{ value: ageSetting }}
            setValue={(value) => setAgeSetting(value.value!)}
            completeValue={ageSubmitHandler}
            min={18}
            max={100}
          />
        </div>
      </SettingThumbnail>
    </SettingsGroup>
  );
};
