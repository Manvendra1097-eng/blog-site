import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogDetail } from "../hooks/useBlogDetail.js";
import { canEditBlog, canDeleteBlog } from "../lib/blogUtils.js";
import Header from "../components/Header.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import BlogContent from "../components/BlogContent.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { useAuth } from "../context/useAuth.js";

export default function BlogDetailPage() {
    const auth = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const { blog, loading, deleting, deleteBlog } = useBlogDetail(id);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleEdit = () => {
        navigate(`/home/blog/${id}/edit`, { state: { blog } });
    };

    const handleDeleteConfirm = () => {
        setShowDeleteDialog(false);
        deleteBlog();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <LoadingState message="Loading blog..." />
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <EmptyState message="Blog not found" />
                </div>
            </div>
        );
    }

    const userCanEdit = canEditBlog(blog, auth.userName);
    const userCanDelete = canDeleteBlog(blog, auth.userName, auth.isAdmin);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <BlogContent
                    blog={blog}
                    canEdit={userCanEdit}
                    canDelete={userCanDelete}
                    onEdit={handleEdit}
                    onDelete={() => setShowDeleteDialog(true)}
                    deleting={deleting}
                />
            </main>

            {showDeleteDialog && (
                <ConfirmDialog
                    open={showDeleteDialog}
                    onClose={() => setShowDeleteDialog(false)}
                    onConfirm={handleDeleteConfirm}
                    title="Delete Blog"
                    description="Are you sure you want to delete this blog? This action cannot be undone."
                    confirmText="Delete"
                    variant="destructive"
                />
            )}
        </div>
    );
}
