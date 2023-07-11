import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks';
import { setInput } from '../model';
import type { SettingName } from '../model/setting.interfaces';
import { useEffect, useRef } from 'react';

interface SettingProperties {
  formName?: string;
  validation?: { min: number; max: number; email?: boolean };
}

const settingList: Record<string, SettingProperties | null> = {
  email: {
    validation: { min: 0, max: 40, email: true },
  },
  name: {
    validation: { min: 2, max: 14 },
  },
  description: {
    validation: { min: 50, max: 400 },
  },
  sex: null,
  interests: null,
  place: {
    validation: { min: 12, max: 30 },
  },
  preferSex: {
    formName: 'Interested in',
  },
  nickname: {
    validation: { min: 6, max: 16 },
  },
};

export function useSettingUrl(): boolean | null {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const isFound = useRef<boolean | null>(null);

  useEffect(() => {
    isFound.current = null;
    const matched = pathname.match(/\/profile\/([a-z]+)-?([a-z]*)/);
    const setting =
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      matched?.[1] +
      (matched?.[2] ? matched[2][0].toUpperCase() + matched[2].slice(1) : '');
    if (setting && Object.keys(settingList).some((el) => el === setting)) {
      isFound.current = true;
      const settingProperties: SettingProperties | null = settingList[setting];
      dispatch(
        setInput({
          settingName: setting as SettingName,
          formName: settingProperties?.formName || setting,
          validation: settingProperties?.validation,
        })
      );
    } else if (matched?.[1]) {
      isFound.current = false;
    }
  }, [pathname, dispatch]);

  return isFound.current;
}
