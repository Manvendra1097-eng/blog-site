import { useState } from "react";
import { FIXED_CATEGORIES } from "../constants/categories.js";
import { updateBlogRequest } from "../services/blogApi.js";
import { toast } from "./ui/toaster.jsx";

export default function EditBlogModal({ auth, blog, onClose, onBlogUpdated }) {
    const [formData, setFormData] = useState({
        title: blog.blogName,
        category: blog.category?.name || "",
        article: blog.article,
    });
    const [updating, setUpdating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || formData.title.length < 20) {
            toast.error("Title must be at least 20 characters");
            return;
        }
        if (!formData.category) {
            toast.error("Category is required");
            return;
        }
        if (
            !formData.article ||
            formData.article.trim().split(/\s+/).length < 1000
        ) {
            toast.error("Article must be at least 1000 words");
            return;
        }

        setUpdating(true);
        try {
            const updated = await updateBlogRequest({
                token: auth.token,
                id: blog.id,
                title: formData.title,
                category: formData.category,
                article: formData.article,
            });
            toast.success("Blog updated successfully!");
            setTimeout(() => {
                onBlogUpdated(updated);
            }, 1000);
        } catch (err) {
            toast.error(err.message || "Failed to update blog");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-lg border border-border shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Edit Blog</h2>
                        <button
                            onClick={onClose}
                            className="rounded-md p-2 hover:bg-accent"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Title (min 20 characters)
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Enter blog title..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    category: e.target.value,
                                })
                            }
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="">Select category</option>
                            {FIXED_CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Article (min 1000 words)
                        </label>
                        <textarea
                            value={formData.article}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    article: e.target.value,
                                })
                            }
                            rows={12}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Write your article here..."
                        />
                        <p className="text-xs text-muted-foreground">
                            {
                                formData.article
                                    .trim()
                                    .split(/\s+/)
                                    .filter(Boolean).length
                            }{" "}
                            words
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={updating}
                            className="flex-1 rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updating}
                            className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
                        >
                            {updating ? "Updating..." : "Update Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
