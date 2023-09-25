import { LocalStorageKeys } from '../storage/localStorageKey';

export const getCurrentUserData = () => {
  try {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.ACCOUNT_DATA));
  } catch {
    return null;
  }
};
export const getCurrentUserRole = () => {
  if (getCurrentUserData()) {
    getCurrentUserData().authority;
  } else {
    return null;
  }
};
