import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Access tokens stay in memory. The refresh token is an HttpOnly cookie and is
// intentionally never read by frontend JavaScript.
let accessToken = null;
let refreshing = null;
export const setAccessToken = (token) => { accessToken = token || null; };

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use((response) => response, async (error) => {
  const original = error.config;
  if (error.response?.status === 401 && original && !original._retry && !original.url?.includes('/auth/login') && !original.url?.includes('/auth/refresh')) {
    original._retry = true;
    try {
      refreshing ||= api.post('/auth/refresh').then(({ data }) => {
        const token = data?.accessToken || data?.access_token || data?.token;
        if (!token) throw new Error('Refresh response did not include an access token.');
        setAccessToken(token);
        return token;
      }).finally(() => { refreshing = null; });
      const token = await refreshing;
      original.headers = original.headers || {};
      original.headers.Authorization = `Bearer ${token}`;
      return api(original);
    } catch (refreshError) {
      setAccessToken(null);
      window.dispatchEvent(new CustomEvent('educore:session-expired'));
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});

export default api;
