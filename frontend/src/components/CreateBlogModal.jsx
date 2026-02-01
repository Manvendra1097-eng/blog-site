import { useState } from "react";
import { FIXED_CATEGORIES } from "../constants/categories.js";
import { createBlogRequest } from "../services/blogApi.js";
import { toast } from "./ui/toaster.jsx";

export default function CreateBlogModal({ auth, onClose, onBlogCreated }) {
    const [newBlog, setNewBlog] = useState({
        title: "",
        category: "",
        article: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newBlog.title || newBlog.title.length < 20) {
            toast.error("Title must be at least 20 characters");
            return;
        }
        if (!newBlog.category) {
            toast.error("Category is required");
            return;
        }
        if (
            !newBlog.article ||
            newBlog.article.trim().split(/\s+/).length < 1000
        ) {
            toast.error("Article must be at least 1000 words");
            return;
        }

        try {
            await createBlogRequest({
                token: auth.token,
                title: newBlog.title,
                category: newBlog.category,
                article: newBlog.article,
            });
            toast.success("Blog created successfully!");
            setNewBlog({ title: "", category: "", article: "" });
            setTimeout(() => {
                onClose();
                onBlogCreated();
            }, 1000);
        } catch (err) {
            toast.error(err.message || "Failed to create blog");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-lg border border-border shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            Create New Blog
                        </h2>
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
                            value={newBlog.title}
                            onChange={(e) =>
                                setNewBlog({
                                    ...newBlog,
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
                            value={newBlog.category}
                            onChange={(e) =>
                                setNewBlog({
                                    ...newBlog,
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
                            value={newBlog.article}
                            onChange={(e) =>
                                setNewBlog({
                                    ...newBlog,
                                    article: e.target.value,
                                })
                            }
                            rows={12}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Write your article here..."
                        />
                        <p className="text-xs text-muted-foreground">
                            {
                                newBlog.article
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
                            className="flex-1 rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                        >
                            Create Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
