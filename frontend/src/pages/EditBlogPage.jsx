import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosConfig";
import BlogForm from "../components/BlogForm";

function EditBlogPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/posts/${id}`);
                setInitialValues(res.data.data.blog);
            } catch {
                setError("Failed to load blog details.");
            }
        };
        fetchBlog();
    }, [id]);

    const handleUpdate = async (blogData) => {
        setLoading(true);
        setError("");
        try {
            await api.put(`/posts/${id}`, blogData);
            navigate(`/blogs/${id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?"))
            return;

        setLoading(true);
        setError("");
        try {
            await api.delete(`/posts/${id}`);
            navigate("/"); // redirect to homepage after deletion
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {initialValues ? (
                <>
                    <BlogForm
                        initialValues={initialValues}
                        onSubmit={handleUpdate}
                        loading={loading}
                        error={error}
                    />

                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Delete Blog"}
                    </button>
                </>
            ) : (
                <p>Loading blog...</p>
            )}
        </div>
    );
}

export default EditBlogPage;
