import { axiosInstance, axiosInstanceWithHeader } from '../../api/api.js';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';

export const clearStorage = () => {
  console.log('clearStorage');
  localStorage.removeItem(LocalStorageKeys.FREEDOM_ACCESS_TOKEN);
  localStorage.removeItem(LocalStorageKeys.FREEDOM_REFRESH_TOKEN);
  localStorage.removeItem(LocalStorageKeys.ACCOUNT_DATA);
  localStorage.clear();
};

export const onLogin = (data) => {
  return axiosInstance.post('/api/authenticate', data);
};

export const sendMail = (email) => {
  return axiosInstance.post('/api/account/reset-password/init', email, {
    headers: {
      'Content-Type': 'text/plain', // Set the content type to text/plain
    },
  });
};

export const newPassword = (data) => {
  return axiosInstance.post('/api/account/reset-password/finish', data);
};

export const getCurrentAccount = () => {
  return axiosInstanceWithHeader.get('/api/account');
};
