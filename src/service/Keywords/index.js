import {axiosInstanceWithHeader} from "../../api/api.js";

export const manageKeyword = (data) => {
  if(data.id) {
    return axiosInstanceWithHeader.put(`/api/admin/keyWords/${data.id}`,data)
  }else {
    return axiosInstanceWithHeader.post('/api/admin/keyWords',data)
  }
}


export const deleteKeyWord = (id) => {
  return axiosInstanceWithHeader.delete(`/api/admin/keyWords/${id}`)
}

export const getKeywords = () => {
  return axiosInstanceWithHeader.get('/api/admin/keyWords');
}
