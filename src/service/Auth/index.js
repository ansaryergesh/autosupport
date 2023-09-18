import { axiosInstance } from '../../api/api.js';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';
import axios from "axios";

export const clearStorage = () => {
  console.log('clearStorage');
  localStorage.removeItem(LocalStorageKeys.FREEDOM_ACCESS_TOKEN);
  localStorage.removeItem(LocalStorageKeys.FREEDOM_REFRESH_TOKEN);
  localStorage.removeItem(LocalStorageKeys.ACCOUNT_DATA);
  localStorage.clear();
};

export const checkerAddress =
  import.meta.env?.MODE === 'development' ? 'http://localhost:8080' : 'http://localhost:8080';


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

export const getCurrentAccount = (bearerToken) => {
  return axios.get(checkerAddress+'/api/account', {
    headers: {
      Authorization: 'Bearer ' + bearerToken,
    },});
};
