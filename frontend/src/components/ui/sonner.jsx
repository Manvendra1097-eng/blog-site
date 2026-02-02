import {
    CircleCheckIcon,
    InfoIcon,
    Loader2Icon,
    OctagonXIcon,
    TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
    return (
        <Sonner
            theme="light"
            className="toaster group"
            icons={{
                success: <CircleCheckIcon className="size-4 text-green-600" />,
                info: <InfoIcon className="size-4 text-blue-600" />,
                warning: (
                    <TriangleAlertIcon className="size-4 text-yellow-600" />
                ),
                error: <OctagonXIcon className="size-4 text-red-600" />,
                loading: <Loader2Icon className="size-4 animate-spin" />,
            }}
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    success:
                        "group-[.toaster]:!bg-green-50 group-[.toaster]:!border-green-300 group-[.toaster]:!text-green-900",
                    error: "group-[.toaster]:!bg-red-50 group-[.toaster]:!border-red-300 group-[.toaster]:!text-red-900",
                    info: "group-[.toaster]:!bg-blue-50 group-[.toaster]:!border-blue-300 group-[.toaster]:!text-blue-900",
                    warning:
                        "group-[.toaster]:!bg-yellow-50 group-[.toaster]:!border-yellow-300 group-[.toaster]:!text-yellow-900",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
