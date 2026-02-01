import { apiClient } from "./apiClient.js";

export async function createBlogRequest({ token, title, category, article }) {
    const response = await apiClient.post(
        `/api/v1.0/blogsite/user/blogs/add/${encodeURIComponent(title)}`,
        { category, article },
    );
    return response.data;
}

export async function updateBlogRequest({
    token,
    id,
    title,
    category,
    article,
}) {
    const response = await apiClient.put(
        `/api/v1.0/blogsite/user/blogs/update/${id}`,
        { blogName: title, category, article },
    );
    return response.data;
}

export async function deleteBlogRequest({ token, blogName }) {
    await apiClient.delete(
        `/api/v1.0/blogsite/user/delete/${encodeURIComponent(blogName)}`,
    );
    return true;
}

export async function searchBlogsRequest({ category, from, to }) {
    let url = `/api/v1.0/blogsite/blogs/info/${encodeURIComponent(category)}`;
    if (from && to) {
        url = `/api/v1.0/blogsite/blogs/get/${encodeURIComponent(category)}/${from}/${to}`;
    }
    const response = await apiClient.get(url);
    return response.data;
}

export async function getAllBlogsRequest() {
    const response = await apiClient.get("/api/v1.0/blogsite/blogs/all");
    return response.data;
}

export async function createCategoryRequest({ token, name }) {
    const response = await apiClient.post(
        "/api/v1.0/blogsite/category/create",
        { name },
    );
    return response.data;
}
