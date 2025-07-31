import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogsPage from "./pages/BlogsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BlogsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
