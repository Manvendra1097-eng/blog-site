import { toast } from "sonner";

/**
 * Centralized error handler for consistent error display
 * @param {Error|string} error - Error object or message
 * @param {string} fallbackMessage - Default message if error has no message
 * @param {boolean} logToConsole - Whether to log to console (useful in development)
 */
export function handleError(
    error,
    fallbackMessage = "An error occurred",
    logToConsole = true,
) {
    const errorMessage = error?.message || error || fallbackMessage;

    if (logToConsole && import.meta.env.DEV) {
        console.error("Error:", error);
    }

    toast.error(errorMessage);
}

/**
 * Handle async errors with consistent error display
 * @param {Function} asyncFn - Async function to execute
 * @param {string} errorMessage - Error message to display on failure
 */
export async function handleAsyncError(asyncFn, errorMessage) {
    try {
        return await asyncFn();
    } catch (error) {
        handleError(error, errorMessage);
        throw error;
    }
}
