import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-9xl font-bold text-primary">404</h1>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground">
                        Sorry, we couldn't find the page you're looking for. It
                        might have been removed, renamed, or doesn't exist.
                    </p>
                </div>

                <div className="flex gap-3 justify-center">
                    <Button onClick={() => navigate("/home")}>
                        Go to Home
                    </Button>
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
