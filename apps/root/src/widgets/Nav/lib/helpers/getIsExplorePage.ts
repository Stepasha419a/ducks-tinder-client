export function getIsExplorePage(pathname: string): boolean {
  return /^\/explore\/?.*/.test(pathname);
}
