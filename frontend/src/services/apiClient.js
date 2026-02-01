import axios from "axios";
import { API_BASE } from "../config/apiConfig.js";

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
    },
});

// Track refresh promise to prevent multiple simultaneous refresh attempts
let refreshPromise = null;

// Request interceptor - Add access token to every request
apiClient.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem("blog_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptor - Handle 401 and auto-refresh token
apiClient.interceptors.response.use(
    (response) => {
        // Success response - return as is
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If 401 error and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // If already refreshing, wait for that promise
                if (!refreshPromise) {
                    refreshPromise = refreshAccessToken();
                }

                const newAccessToken = await refreshPromise;
                refreshPromise = null;

                // Update the failed request with new token and retry
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh failed - logout
                window.localStorage.removeItem("blog_token");
                window.localStorage.removeItem("blog_refresh_token");
                window.localStorage.removeItem("blog_username");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

// Function to refresh the access token
async function refreshAccessToken() {
    const refreshToken = window.localStorage.getItem("blog_refresh_token");
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        // Use axios directly (not apiClient) to avoid interceptor recursion
        const response = await axios.post(
            `${API_BASE}/api/v1.0/blogsite/user/refresh`,
            { refreshToken },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        window.localStorage.setItem("blog_token", accessToken);
        window.localStorage.setItem("blog_refresh_token", newRefreshToken);

        return accessToken;
    } catch (error) {
        throw new Error("Failed to refresh token");
    }
}

export { apiClient };
