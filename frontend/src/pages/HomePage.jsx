import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs.js";
import { useCategories } from "../hooks/useCategories.js";
import { useSearchFilters } from "../hooks/useSearchFilters.js";
import SearchFilters from "../components/SearchFilters.jsx";
import BlogGrid from "../components/BlogGrid.jsx";
import CreateCategoryModal from "../components/CreateCategoryModal.jsx";
import Header from "../components/Header.jsx";
import { useAuth } from "../context/useAuth.js";

export default function HomePage() {
    const navigate = useNavigate();
    const auth = useAuth();
    const { blogs, loading, filters, updateFilters, handleSearch } = useBlogs();

    const {
        categoryNames,
        refreshCategories,
        loading: categoriesLoading,
    } = useCategories();
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    // Extract filter handlers to custom hook
    const { handleCategoryChange, handleFromDateChange, handleToDateChange } =
        useSearchFilters(updateFilters);

    const handleCreateBlog = () => {
        navigate("/home/blog/create");
    };

    const handleCategoryCreated = () => {
        setShowCategoryModal(false);
        refreshCategories();
    };

    const isAdmin = auth.isAdmin;

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <SearchFilters
                        categories={categoryNames}
                        selectedCategory={filters.category}
                        onCategoryChange={handleCategoryChange}
                        fromDate={filters.fromDate}
                        onFromDateChange={handleFromDateChange}
                        toDate={filters.toDate}
                        onToDateChange={handleToDateChange}
                        loading={loading}
                        onSearch={handleSearch}
                        onCreateBlog={handleCreateBlog}
                        onCreateCategory={() => setShowCategoryModal(true)}
                        isAdmin={isAdmin}
                        categoriesLoading={categoriesLoading}
                    />

                    <BlogGrid blogs={blogs} loading={loading} />
                </div>
            </main>

            {showCategoryModal && (
                <CreateCategoryModal
                    onClose={() => setShowCategoryModal(false)}
                    onCategoryCreated={handleCategoryCreated}
                />
            )}
        </div>
    );
}
