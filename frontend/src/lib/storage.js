/**
 * Centralized localStorage wrapper with error handling
 */
export const storage = {
    get: (key) => {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return null;
        }
    },

    set: (key, value) => {
        try {
            window.localStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.error("Error writing to localStorage:", error);
            return false;
        }
    },

    remove: (key) => {
        try {
            window.localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error("Error removing from localStorage:", error);
            return false;
        }
    },

    clear: () => {
        try {
            window.localStorage.clear();
            return true;
        } catch (error) {
            console.error("Error clearing localStorage:", error);
            return false;
        }
    },
};

// Token management constants
export const STORAGE_KEYS = {
    TOKEN: "blog_token",
    USERNAME: "blog_username",
    ROLES: "blog_roles",
};
