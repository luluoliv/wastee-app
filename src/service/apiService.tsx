import axios, { AxiosInstance } from "axios";
import { getToken } from "../utils/getToken";

const apiService: AxiosInstance = axios.create({
    baseURL: "http://192.168.15.13:8000/api/",
    timeout: 100000,
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
