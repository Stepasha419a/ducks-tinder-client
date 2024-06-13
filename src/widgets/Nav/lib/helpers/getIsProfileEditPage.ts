export function getIsProfileEditPage(pathname: string): boolean {
  return /^\/profile\/edit\/?.*/.test(pathname);
}
