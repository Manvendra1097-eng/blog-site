import { useState, useEffect } from "react";
import { getAllCategoriesRequest } from "../services/blogApi.js";
import { handleError } from "../lib/errorHandler.js";

/**
 * Custom hook to manage categories with API integration
 */
let categoriesCache = null;
let categoriesPromise = null;

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadCategories = async (forceRefresh = false) => {
        setLoading(true);
        setError(null);
        try {
            if (!forceRefresh && categoriesCache) {
                setCategories(categoriesCache);
                return;
            }

            if (!forceRefresh && categoriesPromise) {
                const data = await categoriesPromise;
                setCategories(data);
                return;
            }

            categoriesPromise = getAllCategoriesRequest();
            const data = await categoriesPromise;
            categoriesCache = data;
            setCategories(data);
        } catch (err) {
            handleError(err, "Failed to load categories", false);
            setError(err.message || "Failed to load categories");
            setCategories([]);
        } finally {
            categoriesPromise = null;
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const refreshCategories = () => {
        categoriesCache = null;
        categoriesPromise = null;
        loadCategories(true);
    };

    // Extract category names for dropdown usage
    const categoryNames = categories.map((cat) => cat.name);

    return {
        categories,
        categoryNames,
        loading,
        error,
        refreshCategories,
    };
}
