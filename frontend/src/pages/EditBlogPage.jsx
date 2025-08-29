import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

import { useUser } from "../contexts/userContext";
import api from "../utils/axiosConfig";

import BlogForm from "../components/BlogForm";
import LoadingSpinner from "../components/LoadingSpinner";

function EditBlogPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/posts/${id}`);
                const blog = res.data.data.blog;

                // check author
                if (blog.author._id !== user._id) {
                    navigate(`/blogs/${id}`); // kick them back
                    return;
                }

                setInitialValues(blog);
            } catch (err) {
                if (err.response?.status === 404) {
                    setError("Blog not found.");
                    navigate("/");
                } else if (err.response?.status === 500) {
                    setError("Server error. Please try again later.");
                } else {
                    setError("Something went wrong while fetching the blog.");
                }
            }
        };

        fetchBlog();
    }, [id, user, navigate]);

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
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!initialValues) return <LoadingSpinner label="Loading" />;

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

                    {/* Blog Page Link (truncate if long) */}
                    <Link
                        to={`/blogs/${id}`}
                        className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                    >
                        <span className="truncate max-w-[200px]">
                            {initialValues.title}
                        </span>
                    </Link>

                    {/* Separator */}
                    <ChevronRight className="w-4 h-4" />
                    <span>Edit</span>
                </div>
                <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Edit Blog
                </h1>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <BlogForm
                    initialValues={initialValues}
                    onSubmit={handleUpdate}
                    loading={loading}
                    error={error}
                />
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="mt-6 w-full rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                >
                    {loading ? "Processing" : "Delete Blog"}
                </button>
            </div>
        </div>
    );
}

export default EditBlogPage;
