import { useState, useMemo } from "react";
import { loginRequest, logoutRequest } from "../services/authApi.js";
import { storage, STORAGE_KEYS } from "../lib/storage.js";
import { AuthContext } from "./authContext.js";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        const savedToken = storage.get(STORAGE_KEYS.TOKEN);
        const savedUser = storage.get(STORAGE_KEYS.USERNAME);
        if (savedToken && savedUser) {
            return savedToken;
        }
        return "";
    });
    const [userName, setUserName] = useState(() => {
        const savedToken = storage.get(STORAGE_KEYS.TOKEN);
        const savedUser = storage.get(STORAGE_KEYS.USERNAME);
        if (savedToken && savedUser) {
            return savedUser;
        }
        return "";
    });
    const [roles, setRoles] = useState(() => {
        const savedToken = storage.get(STORAGE_KEYS.TOKEN);
        const savedRoles = storage.get(STORAGE_KEYS.ROLES);
        if (savedToken && savedRoles) {
            return savedRoles;
        }
        return [];
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        setError("");
        try {
            const data = await loginRequest(username, password);
            const accessToken = data.accessToken;
            const userRoles = data.roles || [];
            setToken(accessToken || "");
            setUserName(username);
            setRoles(userRoles);
            storage.set(STORAGE_KEYS.TOKEN, accessToken || "");
            storage.set(STORAGE_KEYS.USERNAME, username);
            storage.set(STORAGE_KEYS.ROLES, userRoles);
            return true;
        } catch (err) {
            setError(err.message || "Login failed");
            setToken("");
            setUserName("");
            setRoles([]);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        // Call backend to clear httpOnly cookie
        await logoutRequest();

        // Clear local state
        setToken("");
        setUserName("");
        setRoles([]);
        storage.remove(STORAGE_KEYS.TOKEN);
        storage.remove(STORAGE_KEYS.USERNAME);
        storage.remove(STORAGE_KEYS.ROLES);
    };

    const clearError = () => setError("");

    const value = useMemo(
        () => ({
            token,
            userName,
            roles,
            error,
            loading,
            isAuthenticated: Boolean(token),
            isAdmin: roles.includes("ADMIN"),
            login,
            logout,
            clearError,
        }),
        [token, userName, roles, error, loading],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
