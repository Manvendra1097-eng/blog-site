import { FIXED_CATEGORIES } from "../constants/categories.js";

export default function SearchFilters({
    selectedCategory,
    setSelectedCategory,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    loading,
    onSearch,
    onCreateClick,
    onCreateCategoryClick,
    isAdmin,
}) {
    return (
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold">Browse Blogs</h2>
                <div className="flex items-center gap-2">
                    {isAdmin && (
                        <button
                            onClick={onCreateCategoryClick}
                            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        >
                            + Category
                        </button>
                    )}
                    <button
                        onClick={onCreateClick}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                    >
                        + Create Blog
                    </button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Category (optional)
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="">All Categories</option>
                        {FIXED_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                        From (optional)
                    </label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        disabled={!selectedCategory}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                        To (optional)
                    </label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        disabled={!selectedCategory}
                    />
                </div>
                <div className="flex items-end">
                    <button
                        onClick={onSearch}
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Filter"}
                    </button>
                </div>
            </div>
        </div>
    );
}
