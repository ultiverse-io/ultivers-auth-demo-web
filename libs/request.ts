import axios from 'axios';

const instance = axios.create({
  // baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

instance.interceptors.request.use((config) => {
  // Do something before request is sent
  const ultiverse_auth_info = window.ultiverse_auth_info;

  if (ultiverse_auth_info?.user_info) {
    config.headers['ul-auth-token'] = `${ultiverse_auth_info.user_info.code}******${ultiverse_auth_info.user_info.uid}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

instance.interceptors.response.use((res) => {
  // Do something before request is sent
  return Promise.resolve(res?.data);
}, function (error) {
  // Do something with request error
  return Promise.resolve(error?.response?.data || { success: false });
});

export const getRequest = () => instance;
