import { apiClient } from "./apiClient.js";
import { API_PREFIX } from "../config/apiConfig.js";

export async function createBlogRequest({ title, category, article }) {
    const response = await apiClient.post(
        `${API_PREFIX}/user/blogs/add/${encodeURIComponent(title)}`,
        { category, article },
    );
    return response.data;
}

export async function updateBlogRequest({ id, title, category, article }) {
    const response = await apiClient.put(
        `${API_PREFIX}/user/blogs/update/${id}`,
        { blogName: title, category, article },
    );
    return response.data;
}

export async function deleteBlogRequest({ blogName }) {
    await apiClient.delete(
        `${API_PREFIX}/user/delete/${encodeURIComponent(blogName)}`,
    );
    return true;
}

export async function searchBlogsRequest({ category, from, to }) {
    let url = `${API_PREFIX}/blogs/info/${encodeURIComponent(category)}`;
    if (from && to) {
        url = `${API_PREFIX}/blogs/get/${encodeURIComponent(category)}/${from}/${to}`;
    }
    const response = await apiClient.get(url);
    return response.data;
}

export async function getAllBlogsRequest() {
    const response = await apiClient.get(`${API_PREFIX}/blogs/all`);
    return response.data;
}

export async function getBlogByIdRequest(id) {
    const response = await apiClient.get(`${API_PREFIX}/blogs/${id}`);
    return response.data;
}

export async function createCategoryRequest({ name }) {
    const response = await apiClient.post(`${API_PREFIX}/category/create`, {
        name,
    });
    return response.data;
}

export async function getAllCategoriesRequest() {
    const response = await apiClient.get(`${API_PREFIX}/categories`);
    return response.data;
}
