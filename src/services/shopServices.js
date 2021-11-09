import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getShopProduct = (id) => {
      return axios.get(`${API_URL}/admin/products/${id}`);
}
