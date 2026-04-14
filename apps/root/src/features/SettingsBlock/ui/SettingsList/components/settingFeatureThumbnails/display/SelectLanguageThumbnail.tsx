import { useTranslation } from 'react-i18next';

import { LinkSettingThumbnail } from '@entities/user';
import { ROUTES } from '@ducks-tinder-client/common';
import { LANGUAGE_TRANSCRIPTION, SupportedLanguage } from '@shared/lib';

export const SelectLanguageThumbnail = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || SupportedLanguage.English;

  const url = `${ROUTES.SETTINGS}/language`;
  return (
    <LinkSettingThumbnail
      title={t('profile.settings.display.thumbnails.language')}
      value={LANGUAGE_TRANSCRIPTION[currentLanguage as SupportedLanguage]}
      isPointer
      url={url}
    />
  );
};
