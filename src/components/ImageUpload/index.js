import { axiosInstanceWithHeader } from '../../api/api.js';

export const removeImage = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/image/${id}`);
};
