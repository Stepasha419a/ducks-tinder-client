const activeChatRegex = /\/chat\/[a-z0-9]+/i;

export function getIsMobileNavAvailable(pathname: string) {
  return activeChatRegex.test(pathname);
}
