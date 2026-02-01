import { useState, useEffect } from "react";
import { searchBlogsRequest, getAllBlogsRequest } from "../services/blogApi.js";
import SearchFilters from "../components/SearchFilters.jsx";
import BlogGrid from "../components/BlogGrid.jsx";
import CreateBlogModal from "../components/CreateBlogModal.jsx";
import CreateCategoryModal from "../components/CreateCategoryModal.jsx";
import BlogDetailPage from "./BlogDetailPage.jsx";

export default function HomePage({ auth }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Load all blogs from all categories on mount
    useEffect(() => {
        loadAllBlogs();
    }, []);

    const loadAllBlogs = async () => {
        setLoading(true);
        try {
            const blogs = await getAllBlogsRequest();
            setBlogs(blogs);
        } catch (err) {
            console.error(err);
            setBlogs([]);
        } finally {
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
            console.error(err);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (selectedCategory) {
            loadBlogs(selectedCategory, fromDate || null, toDate || null);
        } else {
            loadAllBlogs();
        }
    };

    const handleBlogCreated = () => {
        if (selectedCategory) {
            loadBlogs(selectedCategory, fromDate || null, toDate || null);
        } else {
            loadAllBlogs();
        }
    };

    const handleViewDetails = (blog) => {
        setSelectedBlog(blog);
    };

    const handleBackToList = () => {
        setSelectedBlog(null);
        // Refresh the blog list when coming back
        if (selectedCategory) {
            loadBlogs(selectedCategory, fromDate || null, toDate || null);
        } else {
            loadAllBlogs();
        }
    };

    const handleBlogUpdated = async (updatedBlog) => {
        // Reload blogs after update/delete
        if (selectedCategory) {
            loadBlogs(selectedCategory, fromDate || null, toDate || null);
        } else {
            loadAllBlogs();
        }

        // If we have an updated blog object, update the selected blog to reflect changes
        if (updatedBlog && selectedBlog) {
            setSelectedBlog(updatedBlog);
        }
    };

    // Show detail page if a blog is selected
    if (selectedBlog) {
        return (
            <BlogDetailPage
                blog={selectedBlog}
                auth={auth}
                onBack={handleBackToList}
                onBlogUpdated={handleBlogUpdated}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                BlogSite
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Discover and share amazing content
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {auth.userName && (
                                <div className="flex items-center gap-2">
                                    <div className="hidden sm:block text-right">
                                        <p className="text-sm font-medium">
                                            {auth.userName}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {auth.userName === "admin"
                                                ? "Admin"
                                                : "User"}
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

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <SearchFilters
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        fromDate={fromDate}
                        setFromDate={setFromDate}
                        toDate={toDate}
                        setToDate={setToDate}
                        loading={loading}
                        onSearch={handleSearch}
                        onCreateClick={() => setShowCreateModal(true)}
                        onCreateCategoryClick={() => setShowCategoryModal(true)}
                        isAdmin={auth.userName === "admin"}
                    />

                    <BlogGrid
                        blogs={blogs}
                        loading={loading}
                        selectedCategory={selectedCategory}
                        onViewDetails={handleViewDetails}
                    />
                </div>
            </main>

            {showCreateModal && (
                <CreateBlogModal
                    auth={auth}
                    onClose={() => setShowCreateModal(false)}
                    onBlogCreated={handleBlogCreated}
                />
            )}

            {showCategoryModal && (
                <CreateCategoryModal
                    auth={auth}
                    onClose={() => setShowCategoryModal(false)}
                    onCategoryCreated={() => {
                        alert(
                            "Category created! Please refresh the page to see the new category.",
                        );
                    }}
                />
            )}
        </div>
    );
}
