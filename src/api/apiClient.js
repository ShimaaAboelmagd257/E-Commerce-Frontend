import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://happily-reward-sinless.ngrok-free.dev/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;