import {axiosInstanceWithHeader} from "../../api/api.js";

export const addKeyword = (data) => {
  return axiosInstanceWithHeader.post('/api/admin/keyWords',data)
}
