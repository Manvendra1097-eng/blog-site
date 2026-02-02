import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../hooks/useCategories.js";
import { createBlogRequest } from "../services/blogApi.js";
import { toast } from "sonner";
import { blogSchema, countWords } from "../lib/schemas.js";
import { Button } from "../components/ui/button.jsx";
import Header from "../components/Header.jsx";
import { useAuth } from "../context/useAuth.js";

export default function CreateBlogPage() {
    const navigate = useNavigate();
    const auth = useAuth();
    const { categoryNames } = useCategories();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            category: "",
            article: "",
        },
    });

    const article = watch("article");
    const title = watch("title");
    const wordCount = countWords(article || "");

    const onSubmit = async (data) => {
        try {
            await createBlogRequest({
                token: auth.token,
                title: data.title,
                category: data.category,
                article: data.article,
            });
            toast.success("Blog created successfully!");
            navigate("/");
        } catch (err) {
            toast.error(err.message || "Failed to create blog");
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Create New Blog
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Share your thoughts with the world
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Title{" "}
                                <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("title")}
                                className="w-full px-4 py-3 border border-input rounded-md bg-background text-lg"
                                placeholder="Enter an engaging title..."
                            />
                            {errors.title && (
                                <p className="text-xs text-destructive">
                                    {errors.title.message}
                                </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                {title?.length || 0}/20 characters minimum
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Category{" "}
                                <span className="text-destructive">*</span>
                            </label>
                            <select
                                {...register("category")}
                                className="w-full px-4 py-3 border border-input rounded-md bg-background"
                            >
                                <option value="">Select a category</option>
                                {categoryNames.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-xs text-destructive">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Article{" "}
                                <span className="text-destructive">*</span>
                            </label>
                            <textarea
                                {...register("article")}
                                rows={20}
                                className="w-full px-4 py-3 border border-input rounded-md bg-background font-mono text-sm"
                                placeholder="Write your article here... (minimum 1000 words)"
                            />
                            {errors.article && (
                                <p className="text-xs text-destructive">
                                    {errors.article.message}
                                </p>
                            )}
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{wordCount} / 1000 words</span>
                                <span
                                    className={
                                        wordCount >= 1000
                                            ? "text-green-600"
                                            : "text-muted-foreground"
                                    }
                                >
                                    {wordCount >= 1000
                                        ? "✓ Minimum reached"
                                        : ""}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 sticky bottom-4 bg-background/95 backdrop-blur py-4 border-t">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1"
                            >
                                {isSubmitting
                                    ? "Publishing..."
                                    : "Publish Blog"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
