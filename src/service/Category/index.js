import {axiosInstance, axiosInstanceWithHeader} from "../../api/api.js";

export const createCategory = (data) => {
  return axiosInstanceWithHeader.post('/api/admin/categories',data);
}

export const createCategoryQuestion = (data) => {
  return axiosInstance.post('/api/admin/questions',data)
}
