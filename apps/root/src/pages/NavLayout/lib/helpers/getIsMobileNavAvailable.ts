import { getIsActiveChatPage } from '@ducks-tinder-client/common';

export function getIsMobileNavAvailable(pathname: string) {
  return !getIsActiveChatPage(pathname) && !getIsProfileEditPage(pathname);
}

function getIsProfileEditPage(pathname: string): boolean {
  return /^\/profile\/edit\/?.*/.test(pathname);
}
