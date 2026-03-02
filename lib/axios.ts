import axios from 'axios';
import { captureException } from '@/modules/sentry';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 20000,
});

let getToken: (() => Promise<string | null>) | null = null;
let refreshToken: (() => Promise<string | null>) | null = null;
let logoutHandler: (() => Promise<void>) | null = null;

export const setClerkTokenGetter = (
  tokenGetter: (() => Promise<string | null>) | null,
) => {
  getToken = tokenGetter;
};

export const setRefreshTokenGetter = (
  refreshTokenGetter: (() => Promise<string | null>) | null,
) => {
  refreshToken = refreshTokenGetter;
};

export const setLogoutHandler = (
  handler: (() => Promise<void>) | null,
) => {
  logoutHandler = handler;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    if (getToken) {
      const token = await getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response?.data?._syncAction?.action === 'RELOAD_TOKEN') {
      if (refreshToken) {
        await refreshToken();
      }
    }
    return response;
  },
  async (error) => {
    const genericMessage = 'Something went wrong.';

    if (error.response?.status === 401) {
      if (logoutHandler) {
        try {
          await logoutHandler();
        } catch (logoutError) {
          console.error('[Axios 401 Logout Error]', logoutError);
        }
      }
      error.userMessage = 'Session expired. Please sign in again.';
      return Promise.reject(error);
    }

    if (error.message === 'Network Error') {
      error.userMessage = genericMessage;
      return Promise.reject(error);
    }

    if (error.code === 'ECONNABORTED' || !error.response) {
      error.userMessage = genericMessage;
      return Promise.reject(error);
    }

    if (
      typeof error.response.data === 'string' &&
      error.response.data.startsWith('<')
    ) {
      error.userMessage = genericMessage;
      return Promise.reject(error);
    }

    const backendMessage = error.response?.data?.message;
    error.userMessage =
      typeof backendMessage === 'string' ? backendMessage : genericMessage;

    captureException(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
