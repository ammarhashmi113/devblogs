import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BlogsPage />} />
                <Route path="/blogs/:id" element={<BlogDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
