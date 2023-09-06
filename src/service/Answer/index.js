import { axiosInstanceWithHeader } from '../../api/api.js';

export const answerByQuestionAndResource = (questionId, resourceId) => {
  return axiosInstanceWithHeader.get(`/api/admin/answers/${questionId}/${resourceId}`);
};

export const addAnswerToQuestion = (data) => {
  return axiosInstanceWithHeader.post(`/api/admin/answers`, data);
};

export const editAnswerQuestion = (data, id) => {
  return axiosInstanceWithHeader.put(`/api/admin/answers/${id}`, data);
};

export const deleteAnswerById = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/answers/${id}`);
};

export const getAnswerById = (qId, rId) => {
  return axiosInstanceWithHeader.get(`/api/admin/answers/${qId}/${rId}`);
};

export const saveAnswer = (id, data) => {
  return axiosInstanceWithHeader.patch(`/api/admin/answers/${id}`, data);
};
