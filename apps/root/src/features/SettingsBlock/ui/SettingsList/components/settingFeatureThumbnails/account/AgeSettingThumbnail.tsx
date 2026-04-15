import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  updateUserThunk,
  useAppDispatch,
  useAppSelector,
} from '@ducks-tinder-client/common';
import { RangeInput } from '@ducks-tinder-client/ui';

import { SettingThumbnail } from '@entities/user';

import * as styles from '../SettingFeatureThumbnails.module.scss';

export const AgeSettingThumbnail = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const age = useAppSelector((state) => state.user.currentUser!.age);
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const [ageSetting, setAgeSetting] = useState(age);

  const ageSubmitHandler = (): void => {
    dispatch(
      updateUserThunk({
        age: ageSetting!,
      })
    );
  };

  return (
    <SettingThumbnail
      title={t('profile.settings.account.thumbnails.age.title')}
      value={
        ageSetting
          ? t('profile.settings.account.thumbnails.age.years', {
              count: ageSetting,
            })
          : t('unknown')
      }
      isError={errorFields.includes('age')}
    >
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
  );
};
