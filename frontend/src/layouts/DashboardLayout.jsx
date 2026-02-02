import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
