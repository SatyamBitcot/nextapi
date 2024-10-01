import axiosInstance from "@/utils/axiosInstance";

export const post = async (url, body) => axiosInstance.post(url, body);

export const get = (url, params) => axiosInstance.get(url, { params });

export const del = async (url, params) =>  axiosInstance.delete(url, { params });

export const put = async (url, body, params) => axiosInstance.put(url, body, { params });