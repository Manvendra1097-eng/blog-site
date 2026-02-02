import { memo } from "react";
import BlogCard from "./BlogCard.jsx";

const BlogGrid = memo(function BlogGrid({ blogs, loading }) {
    const blogCount = blogs.length;
    const blogText = blogCount === 1 ? "Blog" : "Blogs";

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-sm text-muted-foreground">
                    Loading blogs...
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                    {blogCount > 0
                        ? `${blogCount} ${blogText}`
                        : "No blogs found"}
                </h3>
            </div>

            {blogCount === 0 ? (
                <div className="rounded-lg border border-dashed border-border bg-muted/20 px-6 py-12 text-center">
                    <p className="text-muted-foreground">
                        No blogs found. Try creating a new blog!
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id || blog.blogName} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
});

export default BlogGrid;
