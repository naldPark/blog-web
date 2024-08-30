/** 상수 정의 */
export const ACCESS_TOKEN = 'access_token';
export const ACCOUNT_INFO_KEY = 'ACCOUNT_INFO';
export const AUTHORITY = Object.freeze([
  { label: 'Super', value: 0 },
  { label: 'All', value: 1 },
  { label: 'Buddy', value: 2 },
  { label: 'Biz', value: 3 },
  { label: 'Viewer', value: 4 },
]);
export const STATUS = Object.freeze({
  0: 'active',
  1: 'locked',
  2: 'deleted',
});
