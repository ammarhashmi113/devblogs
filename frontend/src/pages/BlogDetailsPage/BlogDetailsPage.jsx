import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserRound, Clock, MessageSquare } from "lucide-react";

import { useUser } from "../../contexts/userContext";
import api from "../../utils/axiosConfig";

import AuthorCard from "../../components/AuthorCard";
import RecentBlogPosts from "../../components/RecentBlogs";
import TagsList from "../../components/TagsList";
import Comments from "../../components/Comments";
import LikeButton from "../../components/LikeButton";

function BlogDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const [blog, setBlog] = useState(null);
    const [blogLikedByUser, setBlogLikedByUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchBlog() {
        try {
            const res = await api.get(`/posts/${id}`);
            setBlog(res.data.data.blog);
            setBlogLikedByUser(res.data.data.likedByUser);
        } catch (err) {
            console.error("Error fetching blog:", err);
            setError("Failed to fetch blog");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?"))
            return;
        try {
            await api.delete(`/posts/${id}`);
            navigate("/");
        } catch (err) {
            console.error("Delete failed:", err);
            setError(err.response?.data?.message || "Failed to delete blog");
        }
    };

    if (loading) {
        return (
            <p className="text-center text-gray-700 dark:text-gray-300">
                Blog is Loading...
            </p>
        );
    }

    if (!blog) {
        return (
            <p className="text-center mt-8 text-red-500 dark:text-red-400">
                Blog not found
            </p>
        );
    }

    const { _id, title, body, imageUrl, createdAt, author, tags, comments } =
        blog;
    const isAuthor = user?._id === author?._id;

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* MAIN CONTENT */}
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-auto rounded-lg"
                        />

                        <h1 className="text-3xl font-bold leading-snug text-gray-900 dark:text-white">
                            {title}
                        </h1>

                        <LikeButton
                            targetId={_id}
                            type="posts"
                            initialLiked={blogLikedByUser}
                            initialCount={blog.likes.length}
                        />

                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-6">
                            <div className="flex items-center gap-2">
                                <UserRound className="w-4 h-4" />
                                <span>{author.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>
                                    {new Date(createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                <span>{comments.length} Comments</span>
                            </div>
                        </div>

                        <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none whitespace-pre-line">
                            {body}
                        </div>

                        {/* ✅ Only author sees Edit/Delete */}
                        {isAuthor && (
                            <div className="flex gap-4 mt-6">
                                <Link
                                    to={`/blogs/${id}/edit`}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        )}

                        {/* COMMENT SECTION */}
                        <Comments id={_id} />
                    </div>

                    {/* SIDEBAR */}
                    <aside className="space-y-8">
                        <AuthorCard author={author} />
                        <RecentBlogPosts />
                        <TagsList tags={tags} />
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default BlogDetailsPage;
