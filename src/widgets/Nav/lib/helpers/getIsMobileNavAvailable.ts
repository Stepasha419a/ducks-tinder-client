import { getIsActiveChatPage } from '@entities/chat';
import { getIsProfileEditPage } from './getIsProfileEditPage';

export function getIsMobileNavAvailable(pathname: string) {
  return !getIsActiveChatPage(pathname) && !getIsProfileEditPage(pathname);
}
