import { axiosInstanceWithHeader } from '../../api/api.js';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';

const ACTIVE_ORGANIZATION = localStorage.getItem(LocalStorageKeys.ACTIVE_ORGANIZATION);

export const deleteSearchHistoryItems = (arr) => {
  return axiosInstanceWithHeader.delete('/api/admin/search-history', {
    data: arr,
  });
};

export const getSearchHistory = (pageCurrent, pageSize, params) => {
  return axiosInstanceWithHeader.get('/api/admin/search-history', {
    params: {
      organizationCode: ACTIVE_ORGANIZATION,
      pageSize,
      pageCurrent,
      query: '',
      ...params,
    },
  });
};

export const getSearchHistoryExcel = () => {
  return axiosInstanceWithHeader.get('/api/export/search-histories', {
    responseType: 'arraybuffer',
  });
};

export const getSearchHistoryCount = () => {
  return axiosInstanceWithHeader.get('/api/admin/search-history/count');
};
