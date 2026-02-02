import { useCallback } from "react";

/**
 * Custom hook to manage search filter handlers
 * Reduces HomePage complexity by encapsulating filter change logic
 */
export function useSearchFilters(updateFilters) {
    const handleCategoryChange = useCallback(
        (value) => {
            updateFilters({ category: value });
        },
        [updateFilters],
    );

    const handleFromDateChange = useCallback(
        (value) => {
            updateFilters({ fromDate: value });
        },
        [updateFilters],
    );

    const handleToDateChange = useCallback(
        (value) => {
            updateFilters({ toDate: value });
        },
        [updateFilters],
    );

    return {
        handleCategoryChange,
        handleFromDateChange,
        handleToDateChange,
    };
}
