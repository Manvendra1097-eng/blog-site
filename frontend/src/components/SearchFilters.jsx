import { Button } from "./ui/button.jsx";

export default function SearchFilters({
    categories,
    selectedCategory,
    onCategoryChange,
    fromDate,
    onFromDateChange,
    toDate,
    onToDateChange,
    loading,
    onSearch,
    onCreateBlog,
    onCreateCategory,
    isAdmin,
    categoriesLoading = false,
}) {
    return (
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold">Browse Blogs</h2>
                <div className="flex items-center gap-2">
                    {isAdmin && (
                        <Button variant="outline" onClick={onCreateCategory}>
                            + Category
                        </Button>
                    )}
                    <Button onClick={onCreateBlog}>+ Create Blog</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                    <label
                        htmlFor="category-select"
                        className="text-sm font-medium"
                    >
                        Category (optional)
                    </label>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        aria-label="Filter by category"
                        disabled={categoriesLoading}
                    >
                        <option value="">
                            {categoriesLoading
                                ? "Loading categories..."
                                : "All Categories"}
                        </option>
                        {!categoriesLoading &&
                            categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="from-date"
                        className="text-sm font-medium text-muted-foreground"
                    >
                        From (optional)
                    </label>
                    <input
                        id="from-date"
                        type="date"
                        value={fromDate}
                        onChange={(e) => onFromDateChange(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        disabled={!selectedCategory}
                        aria-label="Filter from date"
                        aria-disabled={!selectedCategory}
                    />
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="to-date"
                        className="text-sm font-medium text-muted-foreground"
                    >
                        To (optional)
                    </label>
                    <input
                        id="to-date"
                        type="date"
                        value={toDate}
                        onChange={(e) => onToDateChange(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        disabled={!selectedCategory}
                        aria-label="Filter to date"
                        aria-disabled={!selectedCategory}
                    />
                </div>
                <div className="flex items-end">
                    <Button
                        onClick={onSearch}
                        disabled={loading}
                        className="w-full"
                        aria-busy={loading}
                        aria-label="Apply filters"
                    >
                        {loading ? "Loading..." : "Filter"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
