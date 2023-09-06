import { axiosInstanceWithHeader} from '../../api/api'
 
export const getEmployeeData = () => {
  return axiosInstanceWithHeader.get('/api/accounts')
};

export const postEmployeeData = (data) => {
  return axiosInstanceWithHeader.post('/api/create', data);
};

export const deleteEmployee = (id) => {
  return axiosInstanceWithHeader.delete('/api/delete/account/{id}',id)
}