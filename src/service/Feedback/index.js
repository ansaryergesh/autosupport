import { axiosInstanceWithHeader } from '../../api/api.js';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';
import { getLocale } from '../../utils/i18next.js';

const ACTIVE_ORGANIZATION = localStorage.getItem(
  LocalStorageKeys.ACTIVE_ORGANIZATION
);

export const getAllReviews = (startDate, endDate) => {
  return axiosInstanceWithHeader.get('/api/admin/feedbacks', {
    params: {
      pageSize: 20,
      pageCurrent: 0,
      organizationCode: ACTIVE_ORGANIZATION,
      startDate,
      endDate
    }
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

export const getFeedbackExcel = (startDate, endDate) => {
  let params = {
    startDate,
    endDate,
    langKey: getLocale()
  };

  return axiosInstanceWithHeader.get('/api/export/feed-backs', {
    params,
    responseType: 'arraybuffer'
  });
};
