import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

import api from "../utils/axiosConfig";

import BlogForm from "../components/BlogForm";
import LoadingSpinner from "../components/LoadingSpinner";

function CreateBlogPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCreate = async (blogData) => {
        setLoading(true);
        setError("");
        try {
            await api.post("/posts", blogData);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner label="Saving" />;

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {/* Home link */}
                    <Link
                        to="/"
                        className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        <span>Blogs</span>
                    </Link>

                    {/* Separator */}
                    <ChevronRight className="w-4 h-4" />
                    <span>New</span>
                </div>
                <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Create Blog
                </h1>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
                <BlogForm
                    onSubmit={handleCreate}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
}

export default CreateBlogPage;
