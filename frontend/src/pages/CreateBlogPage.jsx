import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
