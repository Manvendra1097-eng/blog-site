import { useAuth } from "./hooks/useAuth.js";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Toaster } from "./components/ui/toaster.jsx";

function App() {
    const auth = useAuth();

    if (!auth.isAuthenticated) {
        return (
            <>
                <LoginPage auth={auth} />
                <Toaster />
            </>
        );
    }

    return (
        <>
            <HomePage auth={auth} />
            <Toaster />
        </>
    );
}

export default App;
