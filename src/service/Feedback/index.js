import { axiosInstanceWithHeader } from '../../api/api.js';

export const getAllReviews = () => {
  return axiosInstanceWithHeader.get('/api/admin/feedbacks', {
    params: { pageSize: 5, pageCurrent: 0 },
  });
};

export const getAllMarks = () => {
  return axiosInstanceWithHeader.get('/api/admin/marks');
};

export const getAnalytics = () => {
  return axiosInstanceWithHeader.get('/api/statistics/feedbacks');
};

export const deleteMark = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/marks/${id}`);
};

export const manageMark = (data) => {
  if (data.id) {
    return axiosInstanceWithHeader.put(`/api/admin/marks/${data.id}`, data);
  } else {
    return axiosInstanceWithHeader.post('/api/admin/marks', data);
  }
};
