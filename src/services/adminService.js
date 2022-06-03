import { axiosInstance } from './api';


const getUser = (id) => {
      return axiosInstance.get(`/admin/users/${id}`);
}

const putUser = (id, data) => {
      return axiosInstance.put(`/admin/users/${id}`, data);
}

const deleteProduct = (id) => {
      return axiosInstance.delete(`/admin/products/${id}`);
}

const removeProduct = (id) => {
      return axiosInstance.get(`/admin/products/remove/${id}`);
}

export const adminService = {
      getUser,
      putUser,
      deleteProduct,
      removeProduct
}
