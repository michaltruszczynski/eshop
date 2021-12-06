import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signupUser = (data) => {
      return axios.post(`${API_URL}/admin/signup`, data);
}

export const signinUser = (data) => {
      return axios.post(`${API_URL}/admin/signin`, data);
}