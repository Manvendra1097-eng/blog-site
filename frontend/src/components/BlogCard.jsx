import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, getCategoryName, truncate } from "../lib/blogUtils.js";

const BlogCard = memo(function BlogCard({ blog }) {
    const navigate = useNavigate();
    const snippet = blog.article
        ? truncate(blog.article, 150)
        : blog.articleSnippet;

    const handleClick = () => {
        navigate(`/blog/${blog.id}`);
    };

    return (
        <article
            onClick={handleClick}
            className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 cursor-pointer"
        >
            <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                    <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {blog.blogName}
                    </h4>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary shrink-0">
                        {getCategoryName(blog)}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">{blog.authorName}</span>
                    <span>•</span>
                    <time>{formatDate(blog.createdAt)}</time>
                </div>

                {snippet && (
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {snippet}
                    </p>
                )}

                <div className="pt-2">
                    <span className="text-xs text-primary font-medium group-hover:underline">
                        Read more →
                    </span>
                </div>
            </div>
        </article>
    );
});

export default BlogCard;
