import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategoryRequest } from "../services/blogApi.js";
import { toast } from "sonner";
import { categorySchema } from "../lib/schemas.js";
import { useAuth } from "../context/useAuth.js";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "./ui/dialog.jsx";
import { Button } from "./ui/button.jsx";

export default function CreateCategoryModal({ onClose, onCategoryCreated }) {
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
        },
    });

    const name = watch("name");

    const onSubmit = async (data) => {
        try {
            await createCategoryRequest({
                token: auth.token,
                name: data.name,
            });
            toast.success("Category created successfully!");
            setTimeout(() => {
                onClose();
                if (onCategoryCreated) {
                    onCategoryCreated();
                }
            }, 1000);
        } catch (err) {
            toast.error(err.message || "Failed to create category");
        }
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                    <DialogDescription>
                        Create a new category for blog posts
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="category-name"
                            className="text-sm font-medium"
                        >
                            Category Name (min 3 characters)
                        </label>
                        <input
                            id="category-name"
                            type="text"
                            {...register("name")}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            placeholder="e.g., Technology, Travel, Food"
                            autoFocus
                            aria-required="true"
                            aria-invalid={!!errors.name}
                            aria-describedby={
                                errors.name
                                    ? "category-name-error"
                                    : "category-name-hint"
                            }
                        />
                        {errors.name && (
                            <p
                                id="category-name-error"
                                className="text-xs text-destructive"
                                role="alert"
                            >
                                {errors.name.message}
                            </p>
                        )}
                        <p
                            id="category-name-hint"
                            className="text-xs text-muted-foreground"
                        >
                            {name?.length || 0}/3 characters
                        </p>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Category"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
