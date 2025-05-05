import { useLocation } from 'react-router-dom';

import { getIsExplorePage, getIsProfilePage } from '../helpers';

export enum NavBlockEnum {
  Setting,
  ChatsPairs,
  Explore,
}

export function useNavBlock(): NavBlockEnum {
  const { pathname } = useLocation();

  const isProfilePage = getIsProfilePage(pathname);
  if (isProfilePage) {
    return NavBlockEnum.Setting;
  }

  const isExplorePage = getIsExplorePage(pathname);
  if (isExplorePage) {
    return NavBlockEnum.Explore;
  }

  return NavBlockEnum.ChatsPairs;
}
