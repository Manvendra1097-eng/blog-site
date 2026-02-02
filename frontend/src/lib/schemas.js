import { z } from "zod";

// Auth schemas
export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/(?=.*[A-Za-z])(?=.*[0-9])/, "Password must be alphanumeric"),
});

// Blog schemas
export const blogSchema = z.object({
    title: z
        .string()
        .min(20, "Title must be at least 20 characters")
        .max(200, "Title must not exceed 200 characters"),
    category: z.string().min(1, "Category is required"),
    article: z
        .string()
        .min(1, "Article is required")
        .refine(
            (val) => val.trim().split(/\s+/).filter(Boolean).length >= 1000,
            "Article must be at least 1000 words",
        ),
});

export const categorySchema = z.object({
    name: z
        .string()
        .min(3, "Category name must be at least 3 characters")
        .max(100, "Category name must not exceed 100 characters"),
});

// Helper function to count words in text
export const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
};
