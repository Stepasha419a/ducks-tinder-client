function getIsActiveChatPage(pathname: string): boolean {
  return /^\/chat\/[a-z0-9-]*$/.test(pathname);
}

export function getIsMobileNavAvailable(pathname: string) {
  return !getIsActiveChatPage(pathname) && !getIsProfileEditPage(pathname);
}

function getIsProfileEditPage(pathname: string): boolean {
  return /^\/profile\/edit\/?.*/.test(pathname);
}
