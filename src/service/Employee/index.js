import { axiosInstanceWithHeader } from '../../api/api';

export const getEmployeeData = () => {
  return axiosInstanceWithHeader.get('/api/accounts');
};

export const getAllRoles = () => {
  return axiosInstanceWithHeader.get('/api/get-roles');
};

export const getAllOrganizations = () => {
  return axiosInstanceWithHeader.get('/api/admin/organizations');
};

export const deleteEmployee = (id) => {
  return axiosInstanceWithHeader.delete(`/api/delete/account/${id}`);
};

export const manageEmployee = (data) => {
  if (data.id) {
    return axiosInstanceWithHeader.put(`/api/update/account/${data.id}`, data);
  } else {
    return axiosInstanceWithHeader.post('/api/create', data);
  }
};





