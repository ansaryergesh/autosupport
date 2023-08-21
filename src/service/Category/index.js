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
  return axiosInstanceWithHeader.get('/api/admin/categories', {params: {langKey}});
};

export const deleteCategory = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/categories/${id}`);
};

export const getCategoryById = (id) => {
  return axiosInstanceWithHeader.get(`/api/admin/categories/${id}`);
};

export const createCategoryQuestion = (data) => {
  return axiosInstanceWithHeader.post('/api/admin/questions',data);
};

export const getQuestionById = (id) => {
  return axiosInstanceWithHeader.get(`/api/admin/questions/${id}`);
};


export const editCategoryQuestion = (data) => {
  return axiosInstanceWithHeader.put(`/api/admin/questions/${data.id}`,data);
};

export const deleteQuestion = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/questions/${id}`);
};
