import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

export default function ProtectedRoute() {
    const auth = useAuth();
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
