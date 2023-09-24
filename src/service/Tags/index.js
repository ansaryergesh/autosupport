import { axiosInstanceWithHeader } from '../../api/api.js';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';

const ACTIVE_ORGANIZATION = localStorage.getItem(LocalStorageKeys.ACTIVE_ORGANIZATION);

export const manageTag = (data) => {
  if (data.id) {
    return axiosInstanceWithHeader.put(`/api/admin/tags/${data.id}`, data);
  } else {
    return axiosInstanceWithHeader.post('/api/admin/tags', data);
  }
};

export const deleteTag = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/tags/${id}`);
};

export const getTags = () => {
  return axiosInstanceWithHeader.get('/api/admin/tags', {
    params: {
      organizationCode: ACTIVE_ORGANIZATION,
    },
  });
};

export const searchTags = (params) => {
  return axiosInstanceWithHeader.get('/api/admin/tags', {
    params: { pageSize: 20, query: '', ...params },
  });
};
