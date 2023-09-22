import axios from 'axios';
import { LocalStorageKeys } from '../storage/localStorageKey.js';
import { notification } from 'antd';
import { clearStorage } from '../service/Auth/index.js';
import { i18n } from '../utils/i18next';

export const checkerAddress = import.meta.env?.MODE === 'development' ? 'http://10.50.216.20' : '/';

export const originAddress =
  import.meta.env?.MODE === 'development' ? 'http://10.50.216.20' : window.location.origin;
const axiosParams = {
  baseURL: checkerAddress,
};

const axiosParamsWithHeader = {
  baseURL: checkerAddress,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem(LocalStorageKeys.FREEDOM_ACCESS_TOKEN),
  },
};

const axiosInstance = axios.create(axiosParams);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error?.status === 401) {
      notification.error({ message: i18n.t('commons.unauthorized') });
      clearStorage();
    } else if (error?.status === '403') {
      notification.error({
        message: i18n.t('commons.accessDenied'),
      });
    } else if (error.response) {
      console.log(error.response.data.message);
      notification.error({
        message: error.response.data.message,
      });
    }

    throw error;
  },
);
const axiosInstanceWithHeader = axios.create(axiosParamsWithHeader);
axiosInstanceWithHeader.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      clearStorage();
      location.reload();
      notification.error({ message: i18n.t('commons.unauthorized') });
    } else if (error.response?.status === 403) {
      notification.error({
        message: i18n.t('commons.accessDenied'),
      });
    } else {
      notification.error(error);
    }
    if (error.response) {
      notification.error({ message: error.response.data.message });
    }
    throw error;
  },
);
export { axiosInstance, axiosInstanceWithHeader };
