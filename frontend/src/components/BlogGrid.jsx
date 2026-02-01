import BlogCard from "./BlogCard.jsx";

export default function BlogGrid({
    blogs,
    loading,
    selectedCategory,
    onViewDetails,
}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                    {blogs.length > 0
                        ? `${blogs.length} Blog${blogs.length !== 1 ? "s" : ""}`
                        : "No blogs found"}
                </h3>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Loading blogs...
                    </p>
                </div>
            ) : blogs.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border bg-muted/20 px-6 py-12 text-center">
                    <p className="text-muted-foreground">
                        No blogs found. Try creating a new blog!
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog, idx) => (
                        <BlogCard
                            key={idx}
                            blog={blog}
                            onViewDetails={onViewDetails}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
