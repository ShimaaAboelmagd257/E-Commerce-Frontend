import apiClient from "./apiClient";

export const login = async (email,password) => {
    const response = await apiClient.post(`/auth/login`,{email,password});

    return response.data;
};

export const register = async (fullName, email, password) => {
    const response = await apiClient.post(`/auth/register`,{fullName, email, password});

    return response.data;
};