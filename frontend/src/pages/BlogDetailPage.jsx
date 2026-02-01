import { useState } from "react";
import { deleteBlogRequest } from "../services/blogApi.js";
import EditBlogModal from "../components/EditBlogModal.jsx";
import { Dialog } from "../components/ui/dialog.jsx";
import { toast } from "../components/ui/toaster.jsx";

export default function BlogDetailPage({ blog, auth, onBack, onBlogUpdated }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const isAdmin = auth.userName === "admin";
    const isOwner = blog.authorName === auth.userName;
    const canEdit = isOwner;
    const canDelete = isAdmin || isOwner;

    const handleDeleteConfirm = async () => {
        setDeleting(true);
        setShowDeleteDialog(false);

        try {
            await deleteBlogRequest({
                token: auth.token,
                blogName: blog.blogName,
            });
            toast.success("Blog deleted successfully!");
            onBack();
            onBlogUpdated();
        } catch (err) {
            toast.error(err.message || "Failed to delete blog");
        } finally {
            setDeleting(false);
        }
    };

    const handleEditSuccess = (updatedBlog) => {
        setShowEditModal(false);
        onBlogUpdated(updatedBlog);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={onBack}
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <span>←</span> Back to Blogs
                        </button>
                        <div className="flex items-center gap-3">
                            {auth.userName && (
                                <div className="flex items-center gap-2">
                                    <div className="hidden sm:block text-right">
                                        <p className="text-sm font-medium">
                                            {auth.userName}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {isAdmin ? "Admin" : "User"}
                                        </p>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-sm font-medium text-primary">
                                            {auth.userName[0].toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={() => auth.logout()}
                                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Blog Content */}
            <main className="container mx-auto px-4 py-8">
                <article className="max-w-4xl mx-auto">
                    {/* Blog Header */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                                {blog.blogName}
                            </h1>
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary shrink-0">
                                {blog.category?.name || "Tech"}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                    {blog.authorName}
                                </span>
                                <span>•</span>
                                <time>
                                    {blog.createdAt
                                        ? new Date(
                                              blog.createdAt,
                                          ).toLocaleDateString("en-US", {
                                              month: "long",
                                              day: "numeric",
                                              year: "numeric",
                                          })
                                        : ""}
                                </time>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {(canEdit || canDelete) && (
                            <div className="flex items-center gap-3 pt-4 border-t border-border">
                                {canEdit && (
                                    <button
                                        onClick={() => setShowEditModal(true)}
                                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                                    >
                                        Edit Blog
                                    </button>
                                )}
                                {canDelete && (
                                    <button
                                        onClick={() =>
                                            setShowDeleteDialog(true)
                                        }
                                        disabled={deleting}
                                        className="inline-flex items-center justify-center rounded-md border border-destructive bg-background px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive hover:text-white disabled:opacity-50"
                                    >
                                        {deleting
                                            ? "Deleting..."
                                            : "Delete Blog"}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Blog Article */}
                    <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                                {blog.article}
                            </div>
                        </div>
                    </div>
                </article>
            </main>

            {/* Edit Modal */}
            {showEditModal && (
                <EditBlogModal
                    auth={auth}
                    blog={blog}
                    onClose={() => setShowEditModal(false)}
                    onBlogUpdated={handleEditSuccess}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                title="Delete Blog"
                description="Are you sure you want to delete this blog? This action cannot be undone."
                onConfirm={handleDeleteConfirm}
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
            />
        </div>
    );
}
