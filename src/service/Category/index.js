import { axiosInstanceWithHeader } from '../../api/api.js';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';
import { getLocale } from '../../utils/i18next.js';
import { LANG_KEY } from '../../constants/index.js';

const ACTIVE_ORGANIZATION = localStorage.getItem(LocalStorageKeys.ACTIVE_ORGANIZATION);

export const createCategory = (data) => {
  return axiosInstanceWithHeader.post('/api/admin/categories', data);
};

export const editCategory = (data) => {
  return axiosInstanceWithHeader.put(`/api/admin/categories/${data.id}`, data);
};

export const getCategories = (params) => {
  return axiosInstanceWithHeader.get('/api/admin/categories', {
    params: {
      langKey: getLocale() || LANG_KEY.RU,
      organizationCode: ACTIVE_ORGANIZATION,
      ...params,
    },
  });
};

export const deleteCategory = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/categories/${id}`);
};

export const getCategoryById = (id) => {
  return axiosInstanceWithHeader.get(`/api/admin/categories/${id}`);
};

export const changeOrderCategory = (categoryId, orderNumber) => {
  return axiosInstanceWithHeader.patch(`/api/admin/categories/${categoryId}/orders/${orderNumber}`);
};
