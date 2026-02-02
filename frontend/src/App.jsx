import { RouterProvider } from "react-router-dom";
import { createRouter } from "./routes/index.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
    const router = createRouter();

    return (
        <AuthProvider>
            <ErrorBoundary>
                <RouterProvider router={router} />
            </ErrorBoundary>
        </AuthProvider>
    );
}

export default App;
