import {axiosInstanceWithHeader} from '../../api/api'
 
export const getEmployeeData = () => {
  return axiosInstanceWithHeader.get('/api/accounts')
};

