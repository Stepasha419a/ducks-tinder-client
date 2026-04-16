import type { FC, PropsWithChildren, SubmitEventHandler } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ROUTES, useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import { Button } from '@ducks-tinder-client/ui';

import type { SettingFieldValues } from '@features/SettingsBlock';

import * as styles from './SettingWrapper.module.scss';
import { useTranslation } from 'react-i18next';

interface SettingFieldInterestsArray {
  input: string[];
}

interface SettingWrapperProps {
  formName: string | null;
  isValid?: boolean;
  errors?: FieldErrors<SettingFieldValues | SettingFieldInterestsArray>;
  submitHandler: SubmitEventHandler<HTMLFormElement>;
}

export const SettingWrapper: FC<PropsWithChildren<SettingWrapperProps>> = ({
  formName,
  children,
  isValid = true,
  errors,
  submitHandler,
}) => {
  const { t } = useTranslation();
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');
  const cancelUrl = isMobile ? ROUTES.SETTINGS : ROUTES.PROFILE;

  const errorMessages = [
    errors?.form?.message,
    errors?.input?.message,
    errors?.root?.message,
  ].filter((item) => item !== undefined);

  return (
    <form onSubmit={submitHandler} className={styles.setting}>
      {errorMessages.map((error: string) => (
        <div key={error} className={`${styles.name} ${styles.error}`}>
          {error.toString()}
        </div>
      ))}
      <div className={styles.name}>
        {t(`profile.settings.fields.${formName}`)}
      </div>
      {children}
      <div className={styles.title}>
        {t(`profile.settings.fields.your.${formName}`)}
      </div>
      <Link to={cancelUrl} className={styles.link}>
        <Button border extraClassName={classNames(styles.btn, styles.noBorder)}>
          {t('cancel')}
        </Button>
      </Link>
      <Button
        border
        type="submit"
        disabled={!isValid}
        extraClassName={styles.btn}
      >
        {t(`profile.settings.fields.update.${formName}`)}
      </Button>
    </form>
  );
};
