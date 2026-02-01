import { useEffect, useState } from "react";
import { loginRequest } from "../services/authApi.js";

export function useAuth() {
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedToken = window.localStorage.getItem("blog_token");
        const savedRefreshToken =
            window.localStorage.getItem("blog_refresh_token");
        const savedUser = window.localStorage.getItem("blog_username");

        if (savedToken && savedRefreshToken && savedUser) {
            setToken(savedToken);
            setUserName(savedUser);
        }
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        setError("");

        try {
            const data = await loginRequest(username, password);
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;

            setToken(accessToken || "");
            setUserName(username);

            window.localStorage.setItem("blog_token", accessToken || "");
            window.localStorage.setItem(
                "blog_refresh_token",
                refreshToken || "",
            );
            window.localStorage.setItem("blog_username", username);

            return true;
        } catch (err) {
            setError(err.message || "Login failed");
            setToken("");
            setUserName("");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken("");
        setUserName("");
        window.localStorage.removeItem("blog_token");
        window.localStorage.removeItem("blog_refresh_token");
        window.localStorage.removeItem("blog_username");
    };

    const clearError = () => setError("");

    return {
        token,
        userName,
        error,
        loading,
        isAuthenticated: Boolean(token),
        login,
        logout,
        clearError,
    };
}
