import { getSettingUrl } from '@entities/user/lib';
import type { ProfileSettingName } from '@entities/user/model/setting';
import { setProfileSetting } from '@entities/user/model/setting';
import { useAppDispatch } from '@shared/lib/hooks';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const settingRegex = /\/profile\/edit\/([a-z]+(?:(?:-)(?:[a-z]+))*)/;

const SETTING_LIST: ProfileSettingName[] = [
  'interests',
  'moreAboutMe',
  'lifestyle',
];

export function useProfileSettingUrl() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isFound = useRef<boolean | null>(null);

  useEffect(() => {
    isFound.current = null;
    const settingName = getSettingUrl(pathname, settingRegex);

    if (
      settingName &&
      SETTING_LIST.includes(settingName as ProfileSettingName)
    ) {
      isFound.current = true;
      dispatch(setProfileSetting(settingName as ProfileSettingName));
    } else {
      isFound.current = false;
    }
  }, [pathname, dispatch]);

  return isFound.current;
}
