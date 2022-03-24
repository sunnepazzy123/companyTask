import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.BASE_URL || 'https://omdbapi.com';

const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
};

export const Axios: AxiosInstance = axios.create(config);