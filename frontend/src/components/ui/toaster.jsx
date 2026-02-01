import { useEffect, useState } from "react";

const toastQueue = [];
let listeners = [];

export const toast = {
    success: (message) => {
        addToast({ type: "success", message });
    },
    error: (message) => {
        addToast({ type: "error", message });
    },
    info: (message) => {
        addToast({ type: "info", message });
    },
};

function addToast(toast) {
    const id = Date.now() + Math.random();
    toastQueue.push({ ...toast, id });
    listeners.forEach((listener) => listener([...toastQueue]));

    setTimeout(() => {
        const index = toastQueue.findIndex((t) => t.id === id);
        if (index > -1) {
            toastQueue.splice(index, 1);
            listeners.forEach((listener) => listener([...toastQueue]));
        }
    }, 4000);
}

export function Toaster() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        listeners.push(setToasts);
        return () => {
            listeners = listeners.filter((l) => l !== setToasts);
        };
    }, []);

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`min-w-[300px] rounded-lg border px-4 py-3 shadow-lg animate-in slide-in-from-top-5 ${
                        t.type === "success"
                            ? "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100"
                            : t.type === "error"
                              ? "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100"
                              : "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100"
                    }`}
                >
                    <div className="flex items-start gap-3">
                        <span className="text-lg">
                            {t.type === "success"
                                ? "✓"
                                : t.type === "error"
                                  ? "✕"
                                  : "ℹ"}
                        </span>
                        <p className="text-sm font-medium flex-1">
                            {t.message}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
