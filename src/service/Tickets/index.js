import { axiosInstanceWithHeader } from '../../api/api.js';

export const getNewTickets = (pageCurrent, pageSize, search, params) => {
  return axiosInstanceWithHeader.get('/api/assist/tickets', {
    params: {
      statusType: 'NEW',
      pageSize,
      pageCurrent,
      search,
      ...params
    }
  });
};

export const getOldTickets = (pageCurrent, pageSize, search, params) => {
  return axiosInstanceWithHeader.get('/api/assist/tickets', {
    params: {
      statusType: 'CLOSED',
      pageSize,
      pageCurrent,
      search,
      ...params
    }
  });
};

export const updateTicketStatus = (data) => {
  return axiosInstanceWithHeader.patch(`/api/assist/tickets/${data.id}`, data);
};

export const getTicketsExcel = (status) => {
  return axiosInstanceWithHeader.get('/api/export/ticket', {
    params: { status }
  });
};
