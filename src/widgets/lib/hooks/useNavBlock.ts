import { useLocation } from 'react-router-dom';
import { useAppSelector } from '@shared/lib/hooks';
import { getIsExplorePage, getIsProfilePage } from '../helpers';

export enum NavBlockEnum {
  Setting,
  ChatsPairs,
  Explore,
}

export function useNavBlock(): NavBlockEnum {
  const { pathname } = useLocation();
  const errorFieldsLength = useAppSelector(
    (state) => state.user.errorFields.length
  );

  const isProfilePage = getIsProfilePage(pathname) || errorFieldsLength !== 0;
  if (isProfilePage) {
    return NavBlockEnum.Setting;
  }

  const isExplorePage = getIsExplorePage(pathname);
  if (isExplorePage) {
    return NavBlockEnum.Explore;
  }

  return NavBlockEnum.ChatsPairs;
}
