import { Component } from "react";
import { Button } from "../components/ui/button.jsx";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background px-4">
                    <div className="max-w-md w-full text-center space-y-6">
                        <div className="space-y-2">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Oops! Something went wrong
                            </h1>
                            <p className="text-muted-foreground">
                                We're sorry for the inconvenience. The
                                application encountered an unexpected error.
                            </p>
                        </div>

                        {process.env.NODE_ENV === "development" &&
                            this.state.error && (
                                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-left">
                                    <p className="text-sm font-mono text-destructive break-all">
                                        {this.state.error.toString()}
                                    </p>
                                    {this.state.errorInfo && (
                                        <details className="mt-2">
                                            <summary className="text-xs cursor-pointer text-muted-foreground">
                                                Stack trace
                                            </summary>
                                            <pre className="text-xs mt-2 overflow-auto max-h-40 text-muted-foreground">
                                                {
                                                    this.state.errorInfo
                                                        .componentStack
                                                }
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            )}

                        <div className="flex gap-3 justify-center">
                            <Button onClick={this.handleReset}>
                                Return to Home
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.reload()}
                            >
                                Reload Page
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
