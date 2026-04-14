import { useNavigate } from 'react-router-dom';
import { SettingWrapper } from '../components';
import { useMemoriedSettingUrl } from '@entities/user';
import { LANGUAGE_TRANSCRIPTION, SupportedLanguage } from '@shared/lib';
import { ROUTES, useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import * as styles from './SelectLanguage.module.scss';
import { RadioInput } from '@ducks-tinder-client/ui';
import { useTranslation } from 'react-i18next';
import type { SubmitEvent } from 'react';

export const SelectLanguage = () => {
  const { i18n } = useTranslation();
  const resolvedLanguage = i18n.resolvedLanguage || SupportedLanguage.English;

  const navigate = useNavigate();
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  const { settingName } = useMemoriedSettingUrl();

  const handleChange = (language: SupportedLanguage) => {
    i18n.changeLanguage(language);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = isMobile ? ROUTES.SETTINGS : ROUTES.PROFILE;

    navigate(url);
  };

  return (
    <SettingWrapper formName={settingName} submitHandler={handleSubmit}>
      <div className={styles.radioWrapper}>
        {Object.values(SupportedLanguage).map((lang) => (
          <RadioInput
            onChange={() => handleChange(lang)}
            checked={resolvedLanguage === lang}
            name="language"
            value={lang}
            text={LANGUAGE_TRANSCRIPTION[lang]}
            extraClassName={styles.radioInput}
          />
        ))}
      </div>
    </SettingWrapper>
  );
};
