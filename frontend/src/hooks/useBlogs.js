import { useState, useEffect } from "react";
import { searchBlogsRequest, getAllBlogsRequest } from "../services/blogApi.js";
import { handleError } from "../lib/errorHandler.js";

/**
 * Custom hook to manage blog listing, filtering, and search logic
 */
let allBlogsCache = null;
let allBlogsPromise = null;

export function invalidateBlogsCache() {
    allBlogsCache = null;
    allBlogsPromise = null;
}

export function useBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        category: "",
        fromDate: "",
        toDate: "",
    });

    // Load all blogs on mount
    useEffect(() => {
        loadAllBlogs();
    }, []);

    const loadAllBlogs = async (forceRefresh = false) => {
        setLoading(true);
        try {
            if (!forceRefresh && allBlogsCache) {
                setBlogs(allBlogsCache);
                return;
            }

            if (!forceRefresh && allBlogsPromise) {
                const blogs = await allBlogsPromise;
                setBlogs(blogs);
                return;
            }

            allBlogsPromise = getAllBlogsRequest();
            const blogs = await allBlogsPromise;
            allBlogsCache = blogs;
            setBlogs(blogs);
        } catch (err) {
            handleError(err, "Failed to load blogs");
            setBlogs([]);
        } finally {
            allBlogsPromise = null;
            setLoading(false);
        }
    };

    const loadBlogs = async (category, from = null, to = null) => {
        setLoading(true);
        try {
            const data = await searchBlogsRequest({ category, from, to });
            const blogList = data.blogs || data || [];
            setBlogs(blogList);
        } catch (err) {
            handleError(err, "Failed to search blogs");
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (filters.category) {
            loadBlogs(
                filters.category,
                filters.fromDate || null,
                filters.toDate || null,
            );
        } else {
            loadAllBlogs();
        }
    };

    const refreshBlogs = () => {
        if (filters.category) {
            loadBlogs(
                filters.category,
                filters.fromDate || null,
                filters.toDate || null,
            );
        } else {
            loadAllBlogs();
        }
    };

    const updateFilters = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    return {
        blogs,
        loading,
        filters,
        updateFilters,
        handleSearch,
        refreshBlogs,
    };
}
