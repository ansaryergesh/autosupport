import {axiosInstanceWithHeader} from "../../api/api.js";

export const answerByQuestionAndResource = (questionId,resourceId) => {
  return axiosInstanceWithHeader.get(`/api/admin/answers/${questionId}/${resourceId}`)
}

export const addAnswerToQuestion = (data) => {
  return axiosInstanceWithHeader.post(`/api/admin/answers`,data)
}

export const editAnswerQuestion = (data,id) => {
  return axiosInstanceWithHeader.put(`/api/admin/answers/${id}`,data)
}
