import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/sonner.jsx";

export default function RootLayout() {
    return (
        <>
            <Outlet />
            <Toaster position="top-right" duration={3000} closeButton />
        </>
    );
}
