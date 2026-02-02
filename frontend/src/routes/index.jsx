import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import BlogDetailPage from "../pages/BlogDetailPage.jsx";
import CreateBlogPage from "../pages/CreateBlogPage.jsx";
import EditBlogPage from "../pages/EditBlogPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import LandingPage from "../pages/LandingPage.jsx";

export const createRouter = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                {
                    index: true,
                    element: <LandingPage />,
                },
                {
                    path: "login",
                    element: <LoginPage />,
                },
                {
                    path: "home",
                    element: <ProtectedRoute />,
                    children: [
                        {
                            index: true,
                            element: <HomePage />,
                        },
                        {
                            path: "blog/create",
                            element: <CreateBlogPage />,
                        },
                        {
                            path: "blog/:id",
                            element: <BlogDetailPage key="detail" />,
                        },
                        {
                            path: "blog/:id/edit",
                            element: <EditBlogPage key="edit" />,
                        },
                    ],
                },
                {
                    path: "*",
                    element: <NotFoundPage />,
                },
            ],
        },
    ]);
};
