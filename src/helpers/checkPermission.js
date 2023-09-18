import { LocalStorageKeys } from '../storage/localStorageKey';

const currentUserRole =
  JSON.parse(localStorage.getItem(LocalStorageKeys.ACCOUNT_DATA))?.authority || '';

export const checkPermissions = (permissions) => {
  return permissions.includes(currentUserRole);
};
