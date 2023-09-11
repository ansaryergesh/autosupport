import { axiosInstanceWithHeader } from '../../api/api.js';

export const deleteSearchHistoryItems = (arr) => {
  return axiosInstanceWithHeader.delete('/api/admin/search-history', {
    data: arr,
  });
};

export const getSearchHistory = (pageCurrent, pageSize, params) => {
  return axiosInstanceWithHeader.get('/api/admin/search-history', {
    params: {
      pageSize,
      pageCurrent,
      query: '',
      ...params,
    },
  });
};
