import axios from 'axios';
import { LocalStorageKeys } from '../storage/localStorageKey.js';
import { notification } from 'antd';
import { clearStorage } from '../service/Auth/index.js';
import { i18n } from '../utils/i18next';

export const checkerAddress =
  import.meta.env?.MODE === 'development'
    ? 'https://dev-help.freedombroker.kz'
    : '/';

export const originAddress =
  import.meta.env?.MODE === 'development'
    ? 'https://dev-help.freedombroker.kz'
    : window.location.origin;
const axiosParams = {
  baseURL: checkerAddress
};

const axiosParamsWithHeader = {
  baseURL: checkerAddress,
  headers: {
    Authorization:
      'Bearer ' + localStorage.getItem(LocalStorageKeys.FREEDOM_ACCESS_TOKEN)
  }
};

const axiosInstance = axios.create(axiosParams);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    if (error?.status === 401) {
      notification.error({ message: i18n.t('commons.unauthorized') });
      clearStorage();
    } else if (error?.status === '403') {
      notification.error({
        message: i18n.t('commons.accessDenied')
      });
    } else if (error?.status === '404') {
      notification.error({
        message: i18n.t('commons.notFound')
      });
    } else if (error.response) {
      console.error(error.response.data.message);
      notification.error({
        message: error.response.data.message || i18n.t('error.wrong')
      });
    }

    throw error;
  }
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
        message: i18n.t('commons.accessDenied')
      });
    } else if (error.response?.status === 404) {
      notification.error({
        message: i18n.t('commons.notFound')
      });
    } else {
      notification.error({ message: error });
      if (error.response) {
        console.error(error);
        console.error('response');
        if (error.response.data.code) {
          const errorCode = error.response.data.code.replace('-', '_');
          notification.error({ message: i18n(errorCode) });
        } else {
          notification.error({
            message: error.response.data.message || 'Error'
          });
        }
      }
    }

    throw error;
  }
);
export { axiosInstance, axiosInstanceWithHeader };
