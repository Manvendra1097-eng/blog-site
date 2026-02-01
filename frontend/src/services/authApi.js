import axios from "axios";
import { API_BASE } from "../config/apiConfig.js";

export async function loginRequest(username, password) {
    const response = await axios.post(
        `${API_BASE}/api/v1.0/blogsite/user/login`,
        { username, password },
        {
            headers: {
                "Content-Type": "application/json",
                accept: "*/*",
            },
        },
    );
    return response.data;
}
