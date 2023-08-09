import { axiosInstanceWithHeader } from '../../api/api.js';

export const manageTags = (data) => {
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
  return axiosInstanceWithHeader.get('/api/admin/tags');
};
