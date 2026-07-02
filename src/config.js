
import axios from "axios";


const API_BASE_URL = axios.create({
    baseURL: "https://happily-reward-sinless.ngrok-free.dev/api",
    headers: {
        "Content-Type": "image/jpeg"
    }
});
export default API_BASE_URL;
