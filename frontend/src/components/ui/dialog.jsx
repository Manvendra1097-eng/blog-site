import { useEffect, useRef } from "react";

export function Dialog({
    isOpen,
    onClose,
    title,
    description,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default",
}) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === dialogRef.current) {
            onClose();
        }
    };

    return (
        <div
            ref={dialogRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-in fade-in"
        >
            <div className="bg-card rounded-lg border border-border shadow-lg max-w-md w-full animate-in zoom-in-95">
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold text-foreground">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow ${
                                variant === "destructive"
                                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                            }`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
