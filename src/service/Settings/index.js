import { axiosInstanceWithHeader } from '../../api/api';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';

const ticketCode = 'availableCreateTiket';
const ACTIVE_ORGANIZATION = localStorage.getItem(
  LocalStorageKeys.ACTIVE_ORGANIZATION
);

export const getTicketSettings = () => {
  return axiosInstanceWithHeader.get('/api/admin/settings', {
    params: {
      code: ticketCode,
      organizationCode: ACTIVE_ORGANIZATION
    }
  });
};

export const updateTicketSettings = (data) => {
  return axiosInstanceWithHeader.patch(`/api/admin/settings/${data.id}`, data);
};
