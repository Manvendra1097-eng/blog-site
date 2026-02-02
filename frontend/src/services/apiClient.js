import axios from "axios";
import { API_BASE, API_PREFIX } from "../config/apiConfig.js";
import { storage, STORAGE_KEYS } from "../lib/storage.js";

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Track refresh promise to prevent multiple simultaneous refresh attempts
let refreshPromise = null;

// Request interceptor - Add access token to every request
apiClient.interceptors.request.use(
    (config) => {
        const token = storage.get(STORAGE_KEYS.TOKEN);
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
                storage.remove(STORAGE_KEYS.TOKEN);
                storage.remove(STORAGE_KEYS.USERNAME);
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

// Function to refresh the access token
async function refreshAccessToken() {
    try {
        // Use axios directly (not apiClient) to avoid interceptor recursion
        const response = await axios.post(
            `${API_BASE}${API_PREFIX}/user/refresh`,
            {},
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        const { accessToken } = response.data;
        storage.set(STORAGE_KEYS.TOKEN, accessToken);

        return accessToken;
    } catch (error) {
        throw new Error("Failed to refresh token");
    }
}

export { apiClient };
