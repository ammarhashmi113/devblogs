import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

function BlogDetailsPage() {
    const { id } = useParams(); // blospost id
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);

    async function fetchBlog() {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/posts/${id}`
            );
            console.log(res.data.data.blog);
            setBlog(res.data.data.blog);
        } catch (err) {
            console.error("Error fetching blog:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    if (loading) {
        return <p>Blog is Loading...</p>;
    }

    if (!blog)
        return <p className="text-center mt-8 text-red-500">Blog not found</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => window.history.back()}
                className="text-sm text-blue-500 hover:underline mb-4"
            >
                ← Back
            </button>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {blog.title}
            </h1>

            <p className="text-gray-600 text-sm mb-6">
                By <span className="font-semibold">{blog.author.username}</span>{" "}
                • {format(new Date(blog.createdAt), "PPP")}
            </p>

            <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-auto rounded-lg mb-6 object-cover"
            />

            <div className="prose max-w-none mb-10">
                {blog.body.split("\n\n").map((para, idx) => (
                    <p key={idx} className="mb-6">
                        {para}
                    </p>
                ))}
            </div>

            <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">
                    Comments ({blog.comments.length})
                </h2>
                {blog.comments.length === 0 && (
                    <p className="text-gray-500">
                        No comments yet. Be the first one!
                    </p>
                )}
                {blog.comments.map((comment) => (
                    <div key={comment._id} className="mb-4">
                        <p className="text-sm text-gray-700 font-semibold">
                            {comment.author.username}
                        </p>
                        <p className="text-gray-800">{comment.body}</p>
                        <p className="text-xs text-gray-400">
                            {format(new Date(comment.createdAt), "PPPp")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogDetailsPage;
