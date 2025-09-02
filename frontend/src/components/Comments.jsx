import { useState, useEffect } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { format } from "date-fns";
import api from "../utils/axiosConfig";
import { useUser } from "../contexts/userContext";

function Comments({ id }) {
    const { user } = useUser();
    const [comments, setComments] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(2); // comments per page
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1,
    });

    // Fetch Blog Comments
    async function fetchBlogComments(pageNum = 1, append = false) {
        try {
            if (!append) setInitialLoading(true); // only show "loading..." for first load
            if (append) setLoadingMore(true);
            const res = await api.get(`/posts/${id}/comments`, {
                params: { page: pageNum, limit },
            });

            if (append) {
                setComments((prev) => [...prev, ...res.data.data.comments]);
            } else {
                setComments(res.data.data.comments);
            }

            setPagination(res.data.data.pagination);
        } catch (err) {
            console.error("Error fetching blog comments:", err);
        } finally {
            if (!append) setInitialLoading(false); // only stop loading for first load
            if (append) setLoadingMore(false);
        }
    }

    // Effect: reset on id change
    useEffect(() => {
        fetchBlogComments(page, page > 1); // append if page > 1
    }, [id, page]);

    // Add Comment
    async function handleAddComment(e) {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            setSubmitting(true);
            await api.post(`/posts/${id}/comments`, { body: newComment });
            setNewComment("");
            setPage(1);
            fetchBlogComments(1, false); // reset comments When posting new comment, reset back to page 1
        } catch (err) {
            console.error("Error posting comment:", err);
        } finally {
            setSubmitting(false);
        }
    }

    // Delete Comment
    async function handleDeleteComment(commentId) {
        try {
            await api.delete(`/posts/${id}/comments/${commentId}`);
            setComments((prev) => prev.filter((c) => c._id !== commentId));
        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    }

    if (initialLoading) {
        return (
            <div className="text-gray-600 dark:text-gray-300">
                Comments are loading...
            </div>
        );
    }

    return (
        <div className="mt-10 space-y-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {pagination.total} Comment{pagination.total > 1 && "s"}
                </h2>
            </div>

            {/* Comment Form */}
            {user ? (
                <form onSubmit={handleAddComment} className="flex gap-2">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 rounded-lg border px-3 py-2 text-sm dark:bg-gray-900 dark:border-gray-700"
                    />
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {submitting ? "Posting..." : "Post"}
                    </button>
                </form>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    You must be logged in to post a comment.
                </p>
            )}

            {/* No Comments */}
            {comments.length === 0 && (
                <div className="mt-6 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MessageSquare className="w-5 h-5" />
                    <p>No comments yet. Be the first to reply 👇</p>
                </div>
            )}

            {/* Comments List */}
            <ul className="space-y-6">
                {comments.map((comment) => (
                    <li
                        key={comment._id}
                        className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex flex-col gap-4"
                    >
                        <div className="flex gap-4">
                            <img
                                src={comment.author.imageUrl}
                                alt={comment.author.name}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {comment.author.name}{" "}
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        @{comment.author.username}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {comment.author.role}
                                </p>
                            </div>

                            {user && user._id === comment.author._id && (
                                <button
                                    onClick={() =>
                                        handleDeleteComment(comment._id)
                                    }
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <p className="text-gray-800 dark:text-gray-200">
                            {comment.body}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            {format(new Date(comment.createdAt), "PPP")}
                        </p>
                    </li>
                ))}
                {loadingMore && <div>More Comments Are Laoding...</div>}
            </ul>

            {/* Load More Button */}
            {pagination.totalPages > 1 && page < pagination.totalPages && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}

export default Comments;
