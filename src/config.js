 import axios from "axios";


export const API_BASE_URL = axios.create({
    baseURL: "https://happily-reward-sinless.ngrok-free.dev/api",
    headers: {
        "ngrok-skip-browser-warning": "true"
    }
});  