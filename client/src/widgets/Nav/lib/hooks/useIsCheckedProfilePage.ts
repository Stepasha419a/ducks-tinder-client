import { useAppSelector } from '@/shared/lib/hooks';
import { getIsProfilePage } from '../helpers';
import { useLocation } from 'react-router-dom';

export function useIsCheckedProfilePage(): boolean {
  const { pathname } = useLocation();

  const errorFieldsLength = useAppSelector(
    (state) => state.setting.errorFields.length
  );

  const isProfilePage = getIsProfilePage(pathname) || errorFieldsLength !== 0;

  return isProfilePage;
}
