import { axiosInstanceWithHeader } from '../../api/api.js';

const statusNew = 'NEW';
const statusClosed = 'CLOSED';

export const getNewTickets = (pageCurrent, pageSize, search, params) => {
  return axiosInstanceWithHeader.get('/api/assist/tickets', {
    params: {
      statusType: statusNew,
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
      statusType: statusClosed,
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

export const getNewTicketsExcel = () => {
  return axiosInstanceWithHeader.get('/api/export/ticket', {
    params: { status: statusNew },
    responseType: 'arraybuffer'
  });
};

export const getOldTicketsExcel = () => {
  return axiosInstanceWithHeader.get('/api/export/ticket', {
    params: { status: statusClosed },
    responseType: 'arraybuffer'
  });
};
