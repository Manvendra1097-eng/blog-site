import { formatDate, getCategoryName } from "../lib/blogUtils.js";
import { Button } from "./ui/button.jsx";

export default function BlogContent({
    blog,
    canEdit,
    canDelete,
    onEdit,
    onDelete,
    deleting,
}) {
    return (
        <article className="max-w-4xl mx-auto">
            {/* Blog Header */}
            <div className="space-y-4 mb-8">
                <div className="flex items-start justify-between gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {blog.blogName}
                    </h1>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary shrink-0">
                        {getCategoryName(blog)}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                            {blog.authorName}
                        </span>
                        <span>•</span>
                        <time>{formatDate(blog.createdAt, "long")}</time>
                    </div>
                </div>

                {/* Action Buttons */}
                {(canEdit || canDelete) && (
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                        {canEdit && <Button onClick={onEdit}>Edit Blog</Button>}
                        {canDelete && (
                            <Button
                                variant="destructive"
                                onClick={onDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete Blog"}
                            </Button>
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
    );
}
