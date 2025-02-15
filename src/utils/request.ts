import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

export const service: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: '',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 追加时间戳，防止GET请求缓存
    if (config.method?.toUpperCase() === 'GET') {
      config.params = { ...config.params, t: new Date().getTime() };
    }
    if (Object.values(config.headers).includes('application/x-www-form-urlencoded')) {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
