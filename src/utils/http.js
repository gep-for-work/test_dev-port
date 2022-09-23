import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: { 'content-type': 'application/json; charset=utf-8' },
});

axios.interceptors.response.use(
  function (response) {
    return response?.data || response;
  },
  function (error) {
    console.log('Failed request', error);
    return Promise.reject(error);
  }
);

export default axios;
