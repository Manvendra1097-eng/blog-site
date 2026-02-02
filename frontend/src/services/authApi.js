import axios from "axios";
import { API_BASE, API_PREFIX } from "../config/apiConfig.js";

export async function loginRequest(username, password) {
    try {
        const response = await axios.post(
            `${API_BASE}${API_PREFIX}/user/login`,
            { username, password },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                },
            },
        );
        return response.data;
    } catch (error) {
        // Extract error message from response
        const message =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Login failed";
        throw new Error(message);
    }
}

export async function logoutRequest() {
    try {
        await axios.post(
            `${API_BASE}${API_PREFIX}/user/logout`,
            {},
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    } catch (error) {
        // Ignore logout errors, just clear local state
        console.error("Logout request failed:", error);
    }
}
