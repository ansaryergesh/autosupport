import {axiosInstance} from "../../api/api.js";

export const onLogin = (data) => {
  return axiosInstance.post('/api/authenticate',data);
}

export const sendMail = (email) => {
  return axiosInstance.post('/api/account/reset-password/init', email,  
    {
      headers: {
        'Content-Type': 'text/plain', // Set the content type to text/plain
      }
  })
}

export const resetPassword = (data) => {
  return axiosInstance.post('/api/account/reset-password/finish', data)
}

