import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, potentialFields } from '../../../models/IUser';
import { logoutThunk } from '../../../redux/authReducer';
import { AppStateType } from '../../../redux/reduxStore';
import { createNotification } from '../../../redux/usersReducer';
import RangeSlider from '../../Slider/RangeSlider/RangeSlider';
import { checkField } from '../utils/ProfileUtils';
import LinksSettingGroup from './SettingGroups/Links/LinksSettingGroup';
import styles from './SettingsList.module.scss';

interface SettingsListPropsInterface {
  currentUser: IUser;
  setIsUserInfoSetting: (isSetting: boolean) => void;
  currentDistanceSetting: number;
  setCurrentDistanceSetting: (currentDistanceSetting: number) => void;
  currentAgeSetting: number;
  setCurrentAgeSetting: (currentAgeSetting: number) => void;
  submitSettings: (
    inputName: string,
    changedData:
      | string
      | number
      | boolean
      | string[]
      | { from: number; to: number },
    innerObjectName?: string
  ) => void;
  setFormName: (formName: string) => void;
  setSettingInputName: (inputName: string) => void;
  setInnerObjectName: (innerObjectName: string) => void;
}

const SettingsList: React.FC<SettingsListPropsInterface> = ({
  currentUser,
  setIsUserInfoSetting,
  currentDistanceSetting,
  setCurrentDistanceSetting,
  currentAgeSetting,
  setCurrentAgeSetting,
  submitSettings,
  setFormName,
  setSettingInputName,
  setInnerObjectName,
}) => {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state: AppStateType) => state.usersPage.notifications
  );

  const [ageSetting, setAgeSetting] = useState<{ min: number; max: number }>(
    currentUser.partnerSettings
      ? {
          min: currentUser.partnerSettings.age.from,
          max: currentUser.partnerSettings.age.to,
        }
      : { min: 18, max: 24 }
  );
  const [errorFields, setErrorFields] = useState<string[]>([]);

  useEffect(() => {
    const newErrorFields = [];

    for (let i = 0; i < potentialFields.length; i++) {
      const field = potentialFields[i];

      let result = checkField(currentUser, field);

      if (result) {
        newErrorFields.push(field);
      }
    }

    if (newErrorFields.length) {
      setErrorFields(newErrorFields);
    } else {
      setErrorFields([]);
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    const errorText =
      'You have some empty fields, there are selected with red color';
    const result = notifications.find((item) => item.text === errorText);
    if (!result && errorFields.length) {
      dispatch(createNotification({ type: 'error', text: errorText }));
    } // eslint-disable-next-line
  }, [errorFields.length, dispatch]);

  const setSettingInput = (
    formName: string,
    inputName: string,
    innerObjectName?: string
  ) => {
    setIsUserInfoSetting(true);
    setFormName(formName);
    setSettingInputName(inputName);
    innerObjectName && setInnerObjectName(innerObjectName);
  };

  const ageHandler = () => {
    submitSettings('age', currentAgeSetting);
  };

  const distanceHandler = () => {
    submitSettings('distance', currentDistanceSetting, 'partnerSettings');
  };

  const partnerAgeHandler = () => {
    submitSettings(
      'age',
      { from: ageSetting.min, to: ageSetting.max },
      'partnerSettings'
    );
  };

  return (
    <div className={styles.groups}>
      <div className={styles.group}>
        <div className={styles.groupTitle}>Account Settings</div>
        <div className={styles.items}>
          <div
            onClick={() => setSettingInput('Email', 'email')}
            className={`${styles.item} ${styles.item_pointer}`}
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
            onClick={() => setSettingInput('Name', 'name')}
            className={`${styles.item} ${styles.item_pointer}`}
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
            onClick={() => setSettingInput('Description', 'description')}
            className={`${styles.item} ${styles.item_pointer} ${
              errorFields.includes('description') ? styles.item_error : ''
            }`}
          >
            <div className={styles.descr}>
              <div className={styles.title}>Description</div>
              <div
                className={`${styles.setting} ${styles.setting_textOverflow}`}
              >
                {currentUser.description || 'Empty description'}
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.openIcon}
                />
              </div>
            </div>
          </div>
          <div
            onClick={() => setSettingInput('Sex', 'sex')}
            className={`${styles.item} ${styles.item_pointer} ${
              errorFields.includes('sex') ? styles.item_error : ''
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
              <div className={styles.setting}>
                {currentAgeSetting} years old
              </div>
            </div>
            <div className={styles.setting}>
              <div className={styles.slider}>
                <RangeSlider
                  value={currentAgeSetting}
                  setValue={setCurrentAgeSetting as any}
                  completeValue={ageHandler as any}
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
      <div className={styles.group}>
        <div className={styles.groupTitle}>Find Settings</div>
        <div className={styles.items}>
          <div
            onClick={() => setSettingInput('Interests', 'interests')}
            className={`${styles.item} ${styles.item_pointer} ${
              errorFields.includes('interests') ? styles.item_error : ''
            }`}
          >
            <div className={styles.descr}>
              <div className={styles.title}>Interests</div>
              <div className={styles.setting}>
                {!currentUser.interests.length
                  ? 'Empty interests'
                  : `${currentUser.interests[0]} and so on...`}
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.openIcon}
                />
              </div>
            </div>
          </div>
          <div
            onClick={() => setSettingInput('Place', 'place', 'partnerSettings')}
            className={`${styles.item} ${styles.item_pointer} ${
              errorFields.includes('place') ? styles.item_error : ''
            }`}
          >
            <div className={styles.descr}>
              <div className={styles.title}>Place</div>
              <div className={styles.setting}>
                {currentUser.partnerSettings.place || 'Empty place'}
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.openIcon}
                />
              </div>
            </div>
          </div>
          <div
            className={`${styles.item} ${
              errorFields.includes('distance') ? styles.item_error : ''
            }`}
          >
            <div className={styles.descr}>
              <div className={styles.title}>Distance</div>
              <div className={styles.setting}>
                {currentDistanceSetting || 'Empty distance'} км.
              </div>
            </div>
            <div className={styles.setting}>
              <div className={styles.slider}>
                <RangeSlider
                  value={currentDistanceSetting}
                  setValue={setCurrentDistanceSetting as any}
                  completeValue={distanceHandler as any}
                  min={2}
                  max={100}
                />
              </div>
              <div className={styles.checkbox}>
                Show people only in this range
                <label className={styles.label}>
                  <input
                    checked={currentUser.partnerSettings.usersOnlyInDistance}
                    onChange={(e) =>
                      submitSettings(
                        'usersOnlyInDistance',
                        e.target.checked,
                        'partnerSettings'
                      )
                    }
                    type="checkbox"
                    className={styles.input}
                  />
                  <div className={styles.content}></div>
                </label>
              </div>
            </div>
          </div>
          <div
            onClick={() =>
              setSettingInput('Interested in', 'preferSex', 'partnerSettings')
            }
            className={`${styles.item} ${styles.item_pointer} ${
              errorFields.includes('preferSex') ? styles.item_error : ''
            }`}
          >
            <div className={styles.descr}>
              <div className={styles.title}>Interested in</div>
              <div className={styles.setting}>
                {currentUser.partnerSettings.preferSex || 'empty sex prefer'}
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.openIcon}
                />
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.descr}>
              <div className={styles.title}>Partner age</div>
              <div className={styles.setting}>
                from {ageSetting.min} to {ageSetting.max}
              </div>
            </div>
            <div className={styles.setting}>
              <div className={styles.slider}>
                <RangeSlider
                  value={ageSetting}
                  setValue={setAgeSetting as any}
                  completeValue={partnerAgeHandler as any}
                  min={18}
                  max={100}
                  isMultiple
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.groupDescr}>
          When the local profiles are over, you will be able to switch to the
          Global Mode for dating people from all over the world.
        </div>
      </div>
      <div className={styles.group}>
        <div className={styles.groupTitle}>Internet account</div>
        <div className={styles.items}>
          <div
            onClick={() => setSettingInput('Nickname', 'nickname')}
            className={`${styles.item} ${styles.item_pointer}`}
          >
            <div className={styles.descr}>
              <div className={styles.title}>Nickname</div>
              <div className={styles.setting}>
                {currentUser.nickname || 'unknown'}
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={styles.openIcon}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.groupDescr}>
          Create a username, share it and start searching for couples on Tinder
          around the world.
        </div>
      </div>
      <LinksSettingGroup />
      <div className={styles.group}>
        <div className={styles.items}>
          <div
            onClick={() => dispatch(logoutThunk() as any)}
            className={`${styles.item} ${styles.item_button}`}
          >
            <div className={styles.descr}>
              <div className={`${styles.title} ${styles.title_center}`}>
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsList;
