import { axiosInstanceWithHeader } from '../../api/api.js';

export const manageResources = (data) => {
  if (data.id) {
    return axiosInstanceWithHeader.put(`/api/admin/resources/${data.id}`, data);
  } else {
    return axiosInstanceWithHeader.post('/api/admin/resources', data);
  }
};

export const deleteResource = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/resources/${id}`);
};

export const getResources = () => {
  return axiosInstanceWithHeader.get('/api/admin/resources');
};
