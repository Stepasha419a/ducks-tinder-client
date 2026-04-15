import { CheckboxInput, Theme, useThemeContext } from '@ducks-tinder-client/ui';
import { useTranslation } from 'react-i18next';

import { SettingThumbnail } from '@entities/user';

export const SwitchThemeThumbnail = () => {
  const { t } = useTranslation();

  const { theme, setTheme } = useThemeContext();

  const isChecked = theme === 'dark';

  const handleChange = () => {
    setTheme(!isChecked ? Theme.Dark : Theme.Light);
  };

  return (
    <SettingThumbnail
      title={t('profile.settings.display.thumbnails.theme.title')}
    >
      <CheckboxInput
        checked={isChecked}
        onChange={handleChange}
        variant="small"
        text={t('profile.settings.display.thumbnails.theme.darkMode')}
      />
    </SettingThumbnail>
  );
};
