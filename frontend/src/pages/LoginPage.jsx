import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { API_BASE } from "../config/apiConfig.js";
import { toast } from "sonner";
import { loginSchema, registerSchema } from "../lib/schemas.js";
import { Button } from "../components/ui/button.jsx";
import { useAuth } from "../context/useAuth.js";
import PublicHeader from "../components/PublicHeader.jsx";
import PublicFooter from "../components/PublicFooter.jsx";

export default function LoginPage() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/home", { replace: true });
        }
    }, [auth.isAuthenticated, navigate]);

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        formState: {
            errors: registerErrors,
            isSubmitting: isRegisterSubmitting,
        },
        reset,
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onLoginSubmit = async (data) => {
        const success = await auth.login(data.username, data.password);
        if (success) {
            navigate("/home", { replace: true });
        }
    };

    const onRegisterSubmit = async (data) => {
        try {
            await axios.post(`${API_BASE}/api/v1.0/blogsite/user/register`, {
                username: data.username,
                email: data.email,
                password: data.password,
            });

            // Registration successful, switch to login
            setIsLogin(true);
            reset({
                username: "",
                email: "",
                password: "",
            });
            toast.success("Registration successful! Please login.");
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                "Registration failed";
            toast.error(errorMessage);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
    };

    const errors = isLogin ? loginErrors : registerErrors;
    const isSubmitting = isLogin ? isLoginSubmitting : isRegisterSubmitting;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <PublicHeader />
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="rounded-lg border border-border bg-card shadow-lg p-8 space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {isLogin ? "Welcome Back" : "Get Started"}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {isLogin
                                    ? "Sign in to explore and create blogs"
                                    : "Create your account to get started"}
                            </p>
                        </div>

                        <form
                            onSubmit={
                                isLogin
                                    ? handleLoginSubmit(onLoginSubmit)
                                    : handleRegisterSubmit(onRegisterSubmit)
                            }
                            className="space-y-4"
                            aria-label={
                                isLogin ? "Login form" : "Registration form"
                            }
                        >
                            <div className="space-y-2">
                                <label
                                    htmlFor="username"
                                    className="text-sm font-medium"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    {...(isLogin
                                        ? registerLogin("username")
                                        : registerRegister("username"))}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="Enter username"
                                    aria-required="true"
                                    aria-invalid={!!errors.username}
                                    aria-describedby={
                                        errors.username
                                            ? "username-error"
                                            : undefined
                                    }
                                />
                                {errors.username && (
                                    <p
                                        id="username-error"
                                        className="text-xs text-destructive"
                                        role="alert"
                                    >
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>

                            {!isLogin && (
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...registerRegister("email")}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="Enter email"
                                        aria-required="true"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={
                                            errors.email
                                                ? "email-error"
                                                : undefined
                                        }
                                    />
                                    {errors.email && (
                                        <p
                                            id="email-error"
                                            className="text-xs text-destructive"
                                            role="alert"
                                        >
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    {...(isLogin
                                        ? registerLogin("password")
                                        : registerRegister("password"))}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="Enter password"
                                    aria-required="true"
                                    aria-invalid={!!errors.password}
                                    aria-describedby={
                                        errors.password
                                            ? "password-error"
                                            : undefined
                                    }
                                />
                                {errors.password && (
                                    <p
                                        id="password-error"
                                        className="text-xs text-destructive"
                                        role="alert"
                                    >
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {auth.error && (
                                <div
                                    className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive"
                                    role="alert"
                                >
                                    {auth.error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full"
                                aria-busy={isSubmitting}
                            >
                                {isSubmitting
                                    ? isLogin
                                        ? "Signing in..."
                                        : "Creating account..."
                                    : isLogin
                                      ? "Sign In"
                                      : "Create Account"}
                            </Button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={switchMode}
                                    className="text-sm text-primary hover:underline"
                                    disabled={isSubmitting}
                                >
                                    {isLogin
                                        ? "Don't have an account? Sign up"
                                        : "Already have an account? Sign in"}
                                </button>
                            </div>

                            {isLogin && (
                                <p className="text-xs text-center text-muted-foreground">
                                    Default admin: admin / Admin1234
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}
