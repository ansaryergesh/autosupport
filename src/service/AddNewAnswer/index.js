import { axiosInstanceWithHeader } from '../../api/api.js';

export const getTags = () => {
  return axiosInstanceWithHeader.get('/api/admin/tags');
};

export const getKeywords = () => {
  return axiosInstanceWithHeader.get('/api/admin/keyWords');
};
