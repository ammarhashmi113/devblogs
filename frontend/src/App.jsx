import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BlogsPage />} />
                    <Route path="/blogs/:id" element={<BlogDetailsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
