import { axiosInstanceWithHeader } from '../../api/api.js';
import { getLocale } from '../../utils/i18next';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';
import { checkPermissions } from '../../helpers/checkPermission.js';

const ACTIVE_ORGANIZATION = localStorage.getItem(
  LocalStorageKeys.ACTIVE_ORGANIZATION
);

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
      pageSize: 5,
      query: '',
      langKey: getLocale().toUpperCase(),
      organizationCode:
        checkPermissions(['ROLE_SUPER_ADMIN']) && ACTIVE_ORGANIZATION,
      ...params
    }
  });
};

export const changeQuestionOrder = (questionId, orderNumber) => {
  return axiosInstanceWithHeader.patch(
    `/api/admin/questions/${questionId}/orders/${orderNumber}`
  );
};

export const searchQuestions = (params) => {
  return axiosInstanceWithHeader.get('/api/admin/questions', {
    params: {
      pageSize: params.pageSize,
      query: params.query,
      langKey: getLocale().toUpperCase(),
      organizationCode:
        checkPermissions(['ROLE_SUPER_ADMIN']) && ACTIVE_ORGANIZATION,
      ...params
    }
  });
};

export const getRelativeQuestions = (questionId, resourceId) => {
  return axiosInstanceWithHeader.get(
    `/api/admin/answers/similar/${questionId}/${resourceId}`
  );
};
