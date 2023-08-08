import {axiosInstance} from "../../api/api.js";

export const onLogin = (data) => {
  return axiosInstance.post('/api/authenticate',data);
}
