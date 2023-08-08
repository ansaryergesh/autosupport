import axios from 'axios';
import {LocalStorageKeys} from "../storage/localStorageKey.js";
import {notification} from "antd";

const axiosParams = {
  baseURL:
  // eslint-disable-next-line no-undef
    import.meta.env?.MODE === 'development' ? 'http://localhost:8080' : '/',
};

const axiosParamsWithHeader = {
  baseURL:
  // eslint-disable-next-line no-undef
    import.meta.env?.MODE === 'development' ? 'http://localhost:8080' : '/',
  headers: {
    Authorization:
      "Bearer " + localStorage.getItem(LocalStorageKeys.FREEDOM_ACCESS_TOKEN),
  },
};

const axiosInstance = axios.create(axiosParams);
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error?.status === 401) {
      notification.error({message:"Не авторизован"})
    } else if (error?.status === '403') {
      notification.error({
        message: 'Нет доступа',
      });
    }
    notification.error(error);
    throw error;
  }
)
const axiosInstanceWithHeader = axios.create(axiosParamsWithHeader);
axiosInstanceWithHeader.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      // logout();
      notification.error({message:"Не авторизован"})
    } else if (error.response?.status === 403) {
      notification.error({
        message: 'Нет доступа',
      });
    }else {
      notification.error(error);
    }
    throw error;
  }
)
export {axiosInstance, axiosInstanceWithHeader}
