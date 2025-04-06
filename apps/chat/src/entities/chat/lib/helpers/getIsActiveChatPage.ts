export function getIsActiveChatPage(pathname: string): boolean {
  return /^\/chat\/[a-z0-9-]*$/.test(pathname);
}
