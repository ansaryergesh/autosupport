import { axiosInstanceWithHeader } from '../../api/api.js';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';

const ACTIVE_ORGANIZATION = localStorage.getItem(LocalStorageKeys.ACTIVE_ORGANIZATION);

export const manageResources = (data) => {
  if (data.id) {
    return axiosInstanceWithHeader.put(`/api/admin/resources/${data.id}`, data, {
      params: {
        id: data.id,
      },
    });
  } else {
    return axiosInstanceWithHeader.post('/api/admin/resources', data);
  }
};

export const getResourceById = (resourceId) => {
  return axiosInstanceWithHeader.get(`/api/admin/resources/${resourceId}`);
};

export const deleteResource = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/resources/${id}`);
};

export const getResources = () => {
  return axiosInstanceWithHeader.get('/api/admin/resources', {
    params: {
      organizationCode: ACTIVE_ORGANIZATION,
    },
  });
};
