import { axiosInstanceWithHeader } from '../../api/api.js';

export const manageOrganization = (data) => {
  if (data.id) {
    return axiosInstanceWithHeader.put(
      `/api/admin/organizations/${data.id}`,
      data
    );
  } else {
    return axiosInstanceWithHeader.post('/api/admin/organizations', data);
  }
};

export const deleteOrganization = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/organizations/${id}`);
};

export const getOrganizations = () => {
  return axiosInstanceWithHeader.get('/api/admin/organizations');
};
