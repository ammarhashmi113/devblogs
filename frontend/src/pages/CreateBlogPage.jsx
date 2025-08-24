import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosConfig";
import BlogForm from "../components/BlogForm";

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

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="relative flex flex-col items-center">
                    {/* Spinner circle */}
                    <div className="w-16 h-16 border-4 border-transparent border-t-indigo-500 border-r-indigo-500 rounded-full animate-spin"></div>

                    {/* Pulsing background glow */}
                    <div className="absolute w-20 h-20 rounded-full bg-indigo-500/20 blur-2xl animate-ping"></div>

                    {/* App title while loading */}
                    <span className="mt-6 text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 animate-pulse">
                        Saving
                    </span>
                </div>
            </div>
        );

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
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
