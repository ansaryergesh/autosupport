import { axiosInstanceWithHeader } from '../../api/api.js';

export const manageOrganization = (data, params, editPage) => {
  if (editPage) {
    return axiosInstanceWithHeader.put(`/api/admin/organizations/${data.code}`, data, {
      params: {
        ...params,
      },
    });
  } else {
    return axiosInstanceWithHeader.post('/api/admin/organizations', data);
  }
};

export const deleteOrganization = (code) => {
  return axiosInstanceWithHeader.delete(`/api/admin/organizations/${code}`);
};

export const getOrganizations = () => {
  return axiosInstanceWithHeader.get('/api/admin/organizations');
};

export const getOrganizationOpen = () => {
  return axiosInstanceWithHeader.get('/api/v1/organizations');
};
