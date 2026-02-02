import { Link } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { PenLineIcon } from "lucide-react";

export default function PublicHeader() {
    return (
        <header className="border-b border-border bg-card/50 backdrop-blur supports-backdrop-filter:bg-card/80 sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <PenLineIcon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold">BlogSite</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link to="/login">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
