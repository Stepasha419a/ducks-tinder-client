import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  updateUserThunk,
  useAppDispatch,
  useAppSelector,
} from '@ducks-tinder-client/common';
import { RangeInput } from '@ducks-tinder-client/ui';

import { SettingThumbnail } from '@entities/user';

import * as styles from '../SettingFeatureThumbnails.module.scss';
import { useUserStore } from '@ducks-tinder-client/auth';

export const PartnerAgeSettingThumbnail = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const preferAgeFrom = useUserStore(
    (state) => state.currentUser?.preferAgeFrom
  );
  const preferAgeTo = useUserStore((state) => state.currentUser?.preferAgeTo);
  const errorFields = useAppSelector((state) => state.user.errorFields);

  const [preferAgeSetting, setPreferAgeSetting] = useState({
    preferAgeFrom,
    preferAgeTo,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreferAgeSetting({
      preferAgeFrom,
      preferAgeTo,
    });
  }, [preferAgeFrom, preferAgeTo]);

  const partnerAgeHandler = (): void => {
    if (
      preferAgeSetting.preferAgeFrom !== preferAgeFrom ||
      preferAgeSetting.preferAgeTo !== preferAgeTo
    ) {
      dispatch(
        updateUserThunk({
          preferAgeFrom: preferAgeSetting.preferAgeFrom!,
          preferAgeTo: preferAgeSetting.preferAgeTo!,
        })
      );
    }
  };

  const areValuesDefined =
    preferAgeSetting.preferAgeFrom && preferAgeSetting.preferAgeTo;

  return (
    <SettingThumbnail
      title={t('profile.settings.find.thumbnails.partnerAge')}
      value={
        areValuesDefined
          ? `${t('age.from')} ${preferAgeSetting.preferAgeFrom!} ${t('age.to')} ${preferAgeSetting.preferAgeTo!}`
          : t('unknown')
      }
      isError={
        errorFields.includes('preferAgeFrom') ||
        errorFields.includes('preferAgeTo')
      }
    >
      <div className={styles.slider}>
        <RangeInput
          value={{
            min: preferAgeSetting.preferAgeFrom || 18,
            max: preferAgeSetting.preferAgeTo || 30,
          }}
          setValue={(value) =>
            setPreferAgeSetting({
              preferAgeFrom: value.min!,
              preferAgeTo: value.max!,
            })
          }
          completeValue={partnerAgeHandler}
          min={18}
          max={100}
          isMultiple
        />
      </div>
    </SettingThumbnail>
  );
};
