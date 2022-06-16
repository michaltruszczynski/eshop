import axios from 'axios';
import { store } from '../store/store'

import { tokenService } from '../utility/auth';
import { authService } from '../services/authService';

import { logout } from '../store/actions'

const { dispatch } = store

export const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/api'
});

axiosInstance.interceptors.request.use(
      (config) => {
            const token = tokenService.getAccessToken();
            const refreshToken = tokenService.getRefreshToken();
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
            const originalError = error;
            const originalConfig = error.config;
            console.log('testing', error.response, error.request)
            if (originalConfig.url !== '/admin/signin' && error.response) {
                  console.log('testing2')
                  if (error.response.status === 401 && originalConfig.url === '/admin/newtoken') {
                        console.log('Check 1')
                        dispatch(logout())
                        return Promise.reject(originalError);
                  }

                  if (error.response.status === 401 && !originalConfig.retry) {
                        console.log('Check 2')
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