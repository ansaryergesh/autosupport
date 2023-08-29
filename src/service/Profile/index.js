import { axiosInstanceWithHeader} from '../../api/api'
 
export const getAccountData = () => {
  return axiosInstanceWithHeader.get('/api/account')
};

export const changePassword = (data) => {
  return axiosInstanceWithHeader.post('/api/account/change-password',data)
}
