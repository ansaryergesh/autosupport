import { axiosInstanceWithHeader} from "../../api/api.js";
import {LANG_KEY} from "../../constants/index.js";
import {getLocale} from "../../utils/i18next.js";

export const createCategory = (data) => {
  return axiosInstanceWithHeader.post('/api/admin/categories',data);
};

export const editCategory = (data) => {
  return axiosInstanceWithHeader.put(`/api/admin/categories/${data.id}`,data);
};

export const getCategories = () => {
  const langKey = getLocale()?.toUpperCase() || LANG_KEY.RU;
  return axiosInstanceWithHeader.get('/api/admin/categories', {params: {langKey, pageSize: 20, pageCurrent: 0, pageTotal: 0}});
};

export const deleteCategory = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/categories/${id}`);
};

export const getCategoryById = (id) => {
  return axiosInstanceWithHeader.get(`/api/admin/categories/${id}`);
};

export const changeOrderCategory = (categoryId,orderNumber) => {
  return axiosInstanceWithHeader.patch(`/api/admin/categories/${categoryId}/orders/${orderNumber}`)
}
