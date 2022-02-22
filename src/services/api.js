import axios from 'axios';

import TokenService from '../utility/auth';
import { authService } from '../services/authService';

export const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/api'
});


axiosInstance.interceptors.request.use(
      (config) => {
            const token = TokenService.getAccessToken();
            const refreshToken = TokenService.getRefreshToken();
            if (token && refreshToken) {
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

                  if (error.response.status === 401 && originalConfig.url === '/admin/newtoken') {
                        return Promise.reject(error);
                  }

                  if (error.response.status === 401 && !originalConfig.retry) {
                        originalConfig.retry = true;
                        try {
                              const response = await authService.newToken();
                              return axiosInstance(originalConfig);
                        } catch (err) {
                              return Promise.reject(err);
                        }
                  }

                  return Promise.reject(error);
            }
            return Promise.reject(error);
      }
);