import { axiosInstanceWithHeader } from '../../api/api.js';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';

const ACTIVE_ORGANIZATION = localStorage.getItem(LocalStorageKeys.ACTIVE_ORGANIZATION);

const statusNew = 'NEW';
const statusClosed = 'CLOSED';

export const getNewTickets = (pageCurrent, pageSize, search, params) => {
  return axiosInstanceWithHeader.get('/api/assist/tickets', {
    params: {
      organizationCode: ACTIVE_ORGANIZATION,
      statusType: statusNew,
      pageSize,
      pageCurrent,
      search,
      ...params,
    },
  });
};

export const getOldTickets = (pageCurrent, pageSize, search, params) => {
  return axiosInstanceWithHeader.get('/api/assist/tickets', {
    params: {
      organizationCode: ACTIVE_ORGANIZATION,
      statusType: statusClosed,
      pageSize,
      pageCurrent,
      search,
      ...params,
    },
  });
};

export const updateTicketStatus = (data) => {
  return axiosInstanceWithHeader.patch(`/api/assist/tickets/${data.id}`, data);
};

export const getNewTicketsExcel = () => {
  return axiosInstanceWithHeader.get('/api/export/tickets', {
    params: { status: statusNew },
    responseType: 'arraybuffer',
  });
};

export const getOldTicketsExcel = () => {
  return axiosInstanceWithHeader.get('/api/export/tickets', {
    params: { status: statusClosed },
    responseType: 'arraybuffer',
  });
};
