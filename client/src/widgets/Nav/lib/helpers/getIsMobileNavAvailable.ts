import { getIsActiveChatPage } from '@/entities/chat/lib';

export function getIsMobileNavAvailable(pathname: string) {
  return getIsActiveChatPage(pathname);
}
