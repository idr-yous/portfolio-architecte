/***
 * @param {string} name
 * @param {string} value
 * @param {number} days
 */

export function setCookie(name, value, days = 1) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${date.toUTCString()};`;
}
