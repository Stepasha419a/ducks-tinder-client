import { getIsActiveChatPage } from '@/entities/chat/lib';
import { getIsProfileEditPage } from './getIsProfileEditPage';

export function getIsMobileNavAvailable(pathname: string) {
  return !getIsActiveChatPage(pathname) && !getIsProfileEditPage(pathname);
}
