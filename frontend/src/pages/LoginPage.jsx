import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config/apiConfig.js";
import { toast } from "../components/ui/toaster.jsx";

export default function LoginPage({ auth }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "admin",
        password: "Admin1234",
        email: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError("");
        await auth.login(formData.username, formData.password);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (formData.username.length < 3) {
            toast.error("Username must be at least 3 characters");
            return;
        }
        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }
        if (!/(?=.*[A-Za-z])(?=.*[0-9])/.test(formData.password)) {
            toast.error("Password must be alphanumeric");
            return;
        }
        if (!formData.email.match(/.+@.+\..+/)) {
            toast.error("Please enter a valid email");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                `${API_BASE}/api/v1.0/blogsite/user/register`,
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                },
            );

            // Registration successful, switch to login
            setError("");
            setIsLogin(true);
            setFormData({
                username: formData.username,
                password: formData.password,
                email: "",
            });
            toast.success("Registration successful! Please login.");
        } catch (err) {
            toast.error(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setError("");
        setFormData({
            username: "",
            password: "",
            email: "",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md">
                <div className="rounded-lg border border-border bg-card shadow-lg p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            BlogSite
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {isLogin
                                ? "Sign in to explore and create blogs"
                                : "Create your account to get started"}
                        </p>
                    </div>

                    <form
                        onSubmit={
                            isLogin ? handleLoginSubmit : handleRegisterSubmit
                        }
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Username
                            </label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder={
                                    isLogin
                                        ? "Enter password"
                                        : "Min 8 chars, alphanumeric"
                                }
                                required
                            />
                        </div>

                        {(error || auth.error) && (
                            <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                                {error || auth.error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || auth.loading}
                            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
                        >
                            {loading || auth.loading
                                ? isLogin
                                    ? "Signing in..."
                                    : "Creating account..."
                                : isLogin
                                  ? "Sign In"
                                  : "Create Account"}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Or
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={switchMode}
                            className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        >
                            {isLogin
                                ? "Create new account"
                                : "Already have an account? Sign in"}
                        </button>

                        {isLogin && (
                            <p className="text-xs text-center text-muted-foreground">
                                Default admin: admin / Admin1234
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
