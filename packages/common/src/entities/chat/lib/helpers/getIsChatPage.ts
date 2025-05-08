export function getIsChatPage(pathname: string): boolean {
  return /^\/chat\/?([a-z0-9-]|\w)*$/.test(pathname);
}
