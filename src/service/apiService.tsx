import axios, { AxiosInstance } from "axios";
import { getToken } from "../utils/getToken";

const apiService: AxiosInstance = axios.create({
    baseURL: "https://wastee-api.onrender.com/api/",
    timeout: 10000,
});

apiService.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiService;
