import { axiosInstance } from './api';


const getUser = (id) => {
      return axiosInstance.get(`/admin/users/${id}`)
}

export const adminService = {
      getUser
}
