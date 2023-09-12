import { axiosInstanceWithHeader } from '../../api/api.js';
import { getLocale } from '../../utils/i18next';

export const createCategoryQuestion = (data) => {
  return axiosInstanceWithHeader.post('/api/admin/questions', data);
};

export const getQuestionById = (id) => {
  return axiosInstanceWithHeader.get(`/api/admin/questions/${id}`);
};

export const editCategoryQuestion = (data) => {
  return axiosInstanceWithHeader.put(`/api/admin/questions/${data.id}`, data);
};

export const editCategoryQuestionPatch = (data) => {
  return axiosInstanceWithHeader.patch(`/api/admin/questions/${data.id}`, data);
};

export const deleteQuestion = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/questions/${id}`);
};

export const getQuestions = (params) => {
  return axiosInstanceWithHeader.get('/api/admin/questions', {
    params: {
      pageSize: 20,
      query: '',
      langKey: getLocale().toUpperCase(),
      ...params,
    },
  });
};

export const changeQuestionOrder = (questionId, orderNumber) => {
  return axiosInstanceWithHeader.patch(`/api/admin/questions/${questionId}/orders/${orderNumber}`);
};

export const searchQuestions = (params) => {
  return axiosInstanceWithHeader.get('/api/admin/questions', {
    params: {
      pageSize: params.pageSize,
      query: params.query,
      langKey: getLocale().toUpperCase(),
      ...params,
    },
  });
};
