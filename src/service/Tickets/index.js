import { axiosInstanceWithHeader } from '../../api/api.js';

export const getNewTickets = (pageCurrent, pageSize, params) => {
  return axiosInstanceWithHeader.get('/api/assist/tickets', {
    params: {
      statusType: 'NEW',
      pageSize,
      pageCurrent,
      query: '',
      ...params,
    },
  });
};

export const getOldTickets = (pageCurrent, pageSize, params) => {
  return axiosInstanceWithHeader.get('/api/assist/tickets', {
    params: {
      statusType: 'CLOSED',
      pageSize,
      pageCurrent,
      query: '',
      ...params,
    },
  });
};

export const updateTicketStatus = (data) => {
  return axiosInstanceWithHeader.patch(`/api/assist/tickets/${data.id}`, data);
};
