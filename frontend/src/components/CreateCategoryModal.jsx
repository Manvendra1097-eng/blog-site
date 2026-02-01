import { useState } from "react";
import { createCategoryRequest } from "../services/blogApi.js";
import { toast } from "./ui/toaster.jsx";

export default function CreateCategoryModal({
    auth,
    onClose,
    onCategoryCreated,
}) {
    const [categoryName, setCategoryName] = useState("");
    const [creating, setCreating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName || categoryName.length < 3) {
            toast.error("Category name must be at least 3 characters");
            return;
        }

        setCreating(true);
        try {
            await createCategoryRequest({
                token: auth.token,
                name: categoryName,
            });
            toast.success("Category created successfully!");
            setCategoryName("");
            setTimeout(() => {
                onClose();
                if (onCategoryCreated) {
                    onCategoryCreated();
                }
            }, 1000);
        } catch (err) {
            toast.error(err.message || "Failed to create category");
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-lg border border-border shadow-lg max-w-md w-full">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            Create New Category
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
                            Category Name (min 3 characters)
                        </label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="e.g., Technology, Travel, Food"
                            autoFocus
                        />
                        <p className="text-xs text-muted-foreground">
                            Create a new category for blog posts
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={creating}
                            className="flex-1 rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={creating}
                            className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
                        >
                            {creating ? "Creating..." : "Create Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
