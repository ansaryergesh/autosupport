import axios from 'axios';
import {LocalStorageKeys} from "../storage/localStorageKey.js";

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

export const axiosInstance = axios.create(axiosParams);

export const axiosInstanceWithHeader = axios.create(axiosParamsWithHeader);

