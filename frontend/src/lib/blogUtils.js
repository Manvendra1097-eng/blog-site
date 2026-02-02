/**
 * Format date to localized string
 */
export function formatDate(dateString, format = "short") {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (format === "short") {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

/**
 * Get category display name or fallback
 */
export function getCategoryName(blog) {
    return blog?.category?.name || "Uncategorized";
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
}

/**
 * Check if user is admin
 */
export function isAdminUser(roles) {
    return Array.isArray(roles) && roles.includes("ADMIN");
}

/**
 * Check if user can edit blog
 */
export function canEditBlog(blog, userName) {
    return blog?.authorName?.toLowerCase() === userName?.toLowerCase();
}

/**
 * Check if user can delete blog
 */
export function canDeleteBlog(blog, userName) {
    return isAdminUser(userName) || canEditBlog(blog, userName);
}
