import axios from 'axios';

import TokenService from '../utility/auth';
import { authService } from '../services/authService';

export const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/api'
});


axiosInstance.interceptors.request.use(
      (config) => {
            const token = TokenService.getAccessToken();
            if (token) {
                  config.headers["x-access-token"] = token;
            }
            return config;
      },
      (error) => {
            return Promise.reject(error);
      }
);

axiosInstance.interceptors.response.use(
      (response) => {
            return response;

      }, async (error) => {
            const originalConfig = error.config;
            if (originalConfig.url !== '/admin/signin' && error.response) {
                  if (error.response.status === 401 && !originalConfig.retry) {
                        originalConfig.retry = true;
                        try {
                              const response = await authService.newToken();
                              // console.log(response);
                              return axiosInstance(originalConfig);
                        } catch (err) {
                              return Promise.reject(err);
                        }
                  }
            }

            return Promise.reject(error);
      }
);