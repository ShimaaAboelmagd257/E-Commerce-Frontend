import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://happily-reward-sinless.ngrok-free.dev/api",
    headers: {
        "Content-Type": "application/json",
    },
});
apiClient.interceptors.request.use((config) => {
    console.log("REQUEST:", config.method, config.baseURL + config.url);
    return config;
});

export default apiClient;