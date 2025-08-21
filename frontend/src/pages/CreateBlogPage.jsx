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
            navigate("/"); // redirect after create
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-6">Create Blog</h1>
            <BlogForm onSubmit={handleCreate} loading={loading} error={error} />
        </div>
    );
}

export default CreateBlogPage;
