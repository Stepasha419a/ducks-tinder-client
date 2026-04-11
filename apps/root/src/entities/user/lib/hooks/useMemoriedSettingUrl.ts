import { useEffect, useRef } from 'react';

import type { SettingNameEnum } from '../constants';
import { useSettingUrl } from './useSettingUrl';

export function useMemoriedSettingUrl() {
  const setting = useSettingUrl();

  const lastExistingValue = useRef<SettingNameEnum | null>(null);

  useEffect(() => {
    if (setting?.settingName) {
      lastExistingValue.current = setting.settingName;
    }
  }, [setting?.settingName]);

  // eslint-disable-next-line react-hooks/refs
  const settingName = setting?.settingName || lastExistingValue.current;

  return {
    ...setting,
    settingName,
  };
}
