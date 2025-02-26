import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const userToken = Cookies.get('userToken');
  const adminToken = Cookies.get('adminToken');
  
  // Special case for activeAdmins endpoint
  if (config.url.includes('/admin/activeAdmins')) {
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
  } else if (config.url.includes('/admin/')) {
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  } else {
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('adminToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;