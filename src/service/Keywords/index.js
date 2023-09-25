import { axiosInstanceWithHeader } from '../../api/api.js';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';

const ACTIVE_ORGANIZATION = localStorage.getItem(LocalStorageKeys.ACTIVE_ORGANIZATION);

export const manageKeyword = (data) => {
  if (data.id) {
    return axiosInstanceWithHeader.put(`/api/admin/keyWords/${data.id}`, data);
  } else {
    return axiosInstanceWithHeader.post('/api/admin/keyWords', data);
  }
};

export const deleteKeyWord = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/keyWords/${id}`);
};

export const getKeywords = () => {
  return axiosInstanceWithHeader.get('/api/admin/keyWords', {
    params: {
      organizationCode: ACTIVE_ORGANIZATION,
    },
  });
};

export const searchKeyWords = (params) => {
  return axiosInstanceWithHeader.get('/api/admin/keyWords', {
    params: { pageSize: 20, query: '', ...params },
  });
};
