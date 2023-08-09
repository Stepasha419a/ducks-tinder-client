export function getIsProfilePage(pathname: string): boolean {
  return /^\/profile\/?.*/.test(pathname);
}
