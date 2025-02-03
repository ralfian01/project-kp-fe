import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY,
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    // console.log('Request URL:', fullUrl);
    return config;
  },
  (response) => {
    return response;
  },
  // (error: AxiosError): Promise<never> => {
  //     return Promise.reject(error);
  // }
);

export default axiosConfig;
