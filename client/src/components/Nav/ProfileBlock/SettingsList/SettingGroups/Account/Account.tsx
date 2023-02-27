import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { setInput } from '../../../../../../redux/settings/settings.slice';
import { submitSettingsThunk } from '../../../../../../redux/settings/settings.thunks';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { RangeInput } from '../../../../../ui';
import { RangeValue } from '../../../../../ui/inputs/Range';
import styles from './Account.module.scss';

export const Account = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.usersPage.currentUser);
  const errorFields = useAppSelector((state) => state.settings.errorFields);

  const [currentAgeSetting, setCurrentAgeSetting] = useState(
    currentUser.age ? currentUser.age : 18
  );

  const ageHandler = () => {
    dispatch(
      submitSettingsThunk({
        inputName: 'age',
        changedData: currentAgeSetting,
      })
    );
  };

  const setEmailHandler = () => {
    dispatch(
      setInput({
        inputName: 'email',
        validation: { min: 0, max: 40, email: true },
      })
    );
  };
  const setNameHandler = () => {
    dispatch(
      setInput({
        inputName: 'name',
        validation: { min: 2, max: 14 },
      })
    );
  };
  const setDescriptionHandler = () => {
    dispatch(
      setInput({
        inputName: 'description',
        validation: { min: 50, max: 400 },
      })
    );
  };
  const setSexHandler = () => {
    dispatch(
      setInput({
        inputName: 'sex',
      })
    );
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
            <div className={`${styles.setting} ${styles.setting_textOverflow}`}>
              {currentUser.description || 'Empty description'}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.openIcon}
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
