export function getFormattedDateString(date: Date) {
  const yyyy = date.getFullYear();
  let mm = (date.getMonth() + 1).toString();
  let dd = date.getDate().toString();

  if (+dd < 10) {
    dd = '0' + dd;
  }
  if (+mm < 10) {
    mm = '0' + mm;
  }

  return dd + '-' + mm + '-' + yyyy;
}
