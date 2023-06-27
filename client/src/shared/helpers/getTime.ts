// time is like 11:10:09 - hh:mm:ss
// returns 11:10 - hh:mm
export function getTime(time: string) {
  return time.match(/\d{2}:\d{2}/);
}
