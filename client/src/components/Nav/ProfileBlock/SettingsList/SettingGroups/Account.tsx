import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';
import {
  ChangedData,
  InnerObjectName,
  SettingInputName,
  Validation,
} from '../../../../../redux/settings/settings.interfaces';
import { useAppSelector } from '../../../../../redux/store';
import { RangeInput } from '../../../../ui';
import { RangeValue } from '../../../../ui/inputs/Range';
import styles from '../SettingsList.module.scss';

interface AccoutProps {
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

export const Account: FC<AccoutProps> = ({
  setInputHandler,
  updateInputHandler,
}) => {
  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const errorFields = useAppSelector((state) => state.settings.errorFields);

  const [currentAgeSetting, setCurrentAgeSetting] = useState(
    currentUser.age ? currentUser.age : 18
  );

  const ageHandler = () => {
    updateInputHandler('age', currentAgeSetting);
  };

  const setEmailHandler = () => {
    setInputHandler('email', { min: 0, max: 40, email: true });
  };
  const setNameHandler = () => {
    setInputHandler('name', { min: 2, max: 14 });
  };
  const setDescriptionHandler = () => {
    setInputHandler('description', { min: 50, max: 400 });
  };
  const setSexHandler = () => {
    setInputHandler('sex');
  };

  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>Account Settings</div>
      <div className={styles.items}>
        <div
          onClick={setEmailHandler}
          className={`${styles.item} ${styles.pointer}`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Email</div>
            <div className={styles.setting}>
              {currentUser.email}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
        <div
          onClick={setNameHandler}
          className={`${styles.item} ${styles.pointer}`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Name</div>
            <div className={styles.setting}>
              {currentUser.name}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
        <div
          onClick={setDescriptionHandler}
          className={`${styles.item} ${styles.pointer} ${
            errorFields.includes('description') ? styles.error : ''
          }`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Description</div>
            <div className={`${styles.setting} ${styles.textOverflow}`}>
              {currentUser.description || 'Empty description'}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={`${styles.openIcon} ${styles.absolute}`}
              />
            </div>
          </div>
        </div>
        <div
          onClick={setSexHandler}
          className={`${styles.item} ${styles.pointer} ${
            errorFields.includes('sex') ? styles.error : ''
          }`}
        >
          <div className={styles.descr}>
            <div className={styles.title}>Sex</div>
            <div className={styles.setting}>
              {currentUser.sex || 'Empty sex'}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
              />
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.descr}>
            <div className={styles.title}>Age</div>
            <div className={styles.setting}>{currentAgeSetting} years old</div>
          </div>
          <div className={styles.setting}>
            <div className={styles.slider}>
              <RangeInput
                value={currentAgeSetting}
                setValue={(value: RangeValue) => {
                  setCurrentAgeSetting(+value);
                }}
                completeValue={ageHandler}
                min={18}
                max={100}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.groupDescr}>
        Verified email adress helps to protect your account
      </div>
    </div>
  );
};
