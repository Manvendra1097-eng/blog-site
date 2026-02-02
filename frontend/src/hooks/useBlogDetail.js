import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogByIdRequest, deleteBlogRequest } from "../services/blogApi.js";
import { toast } from "sonner";
import { useAuth } from "../context/useAuth.js";
import { invalidateBlogsCache } from "./useBlogs.js";

/**
 * Custom hook to manage blog detail page logic
 */
export function useBlogDetail(blogId) {
    const auth = useAuth();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    const loadBlog = async () => {
        setLoading(true);
        try {
            const blogData = await getBlogByIdRequest(blogId);
            setBlog(blogData);
        } catch (err) {
            toast.error(err.message || "Failed to load blog");
            setBlog(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBlog();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogId]);

    const deleteBlog = async () => {
        if (!blog) return;

        setDeleting(true);
        try {
            await deleteBlogRequest({
                token: auth.token,
                blogName: blog.blogName,
            });
            toast.success("Blog deleted successfully!");
            invalidateBlogsCache();
            navigate("/");
        } catch (err) {
            toast.error(err.message || "Failed to delete blog");
            setDeleting(false);
        }
    };

    const updateBlog = (updatedBlog) => {
        setBlog(updatedBlog);
    };

    return {
        blog,
        loading,
        deleting,
        deleteBlog,
        updateBlog,
    };
}
