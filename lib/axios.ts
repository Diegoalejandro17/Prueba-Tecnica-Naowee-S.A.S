import axios from 'axios';

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
});

export const fieldsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FIELDS_URL,
});

export const reservationsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RESERVATIONS_URL,
});

export const rolesApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROLES_URL,
});

export const dashboardApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DASHBOARD_URL,
});

const addAuthInterceptor = (instance: ReturnType<typeof axios.create>) => {
  instance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });
};

addAuthInterceptor(fieldsApi);
addAuthInterceptor(reservationsApi);
addAuthInterceptor(rolesApi);
addAuthInterceptor(dashboardApi);