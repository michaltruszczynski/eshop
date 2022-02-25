import { axiosInstance } from './api';


const getUser = (id) => {
      return axiosInstance.get(`/admin/users/${id}`);
}

const putUser = (id, data) => {
      return axiosInstance.put(`/admin/users/${id}`, data);
}

export const adminService = {
      getUser,
      putUser
}
