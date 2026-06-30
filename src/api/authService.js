import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://happily-reward-sinless.ngrok-free.dev/api",
    headers: {
        "Content-Type": "application/json",
    }
});
export const login = async (email,password) => {
    const response = await apiClient.post(`/auth/login`,{email,password});

    return response.data;
};

export const register = async (fullName, email, password) => {
    const response = await apiClient.post(`/auth/register`,{fullName, email, password});

    return response.data;
};