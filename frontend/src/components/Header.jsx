import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { LogOutIcon, ArrowLeftIcon } from "lucide-react";
import { useAuth } from "../context/useAuth.js";

export default function Header() {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const isDetailPage =
        location.pathname.startsWith("/blog/") &&
        !location.pathname.includes("/edit") &&
        !location.pathname.includes("/create");
    const isEditOrCreatePage =
        location.pathname.includes("/edit") ||
        location.pathname.includes("/create");
    const showBackButton = isDetailPage || isEditOrCreatePage;

    const handleLogout = async () => {
        await auth.logout();
        navigate("/login", { replace: true });
    };

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    };

    const getInitials = (name) => {
        if (!name) return "U";
        const words = name.trim().split(/\s+/);
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    };

    return (
        <header className="border-b border-border bg-card/50 backdrop-blur supports-backdrop-filter:bg-card/80 sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {showBackButton && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleBack}
                                aria-label="Back to previous page"
                            >
                                <ArrowLeftIcon className="h-5 w-5" />
                            </Button>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                BlogSite
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {isDetailPage
                                    ? "Blog Details"
                                    : isEditOrCreatePage
                                      ? "Manage Blog"
                                      : "Discover and share amazing content"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {auth.userName && (
                            <div className="flex flex-col items-center gap-1">
                                <div
                                    className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary"
                                    aria-label={`${auth.userName}'s avatar`}
                                >
                                    {getInitials(auth.userName)}
                                </div>
                                <p className="text-xs font-medium text-muted-foreground">
                                    {auth.userName}
                                </p>
                            </div>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="gap-2"
                        >
                            <LogOutIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
