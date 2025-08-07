import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { format } from "date-fns";

import api from "../utils/axiosConfig";

function Comments({ id }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchBlogComments() {
        try {
            const res = await api.get(`/posts/${id}/comments`);
            setComments(res.data.data.comments);
        } catch (err) {
            console.error("Error fetching blog comments:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogComments();
    }, [id]);

    if (loading) {
        return (
            <div className="text-gray-600 dark:text-gray-300">
                Comments are loading...
            </div>
        );
    }

    if (comments.length === 0) {
        return (
            <div className="mt-10 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MessageSquare className="w-5 h-5" />
                <p>No comments yet. Be the first to reply 👇</p>
            </div>
        );
    }

    return (
        <div className="mt-10 space-y-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {comments.length} Comment{comments.length > 1 && "s"}
                </h2>
            </div>

            <ul className="space-y-6">
                {comments.map((comment) => (
                    <li
                        key={comment._id}
                        className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 transition-colors duration-300"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <img
                                    src={
                                        comment.author.imageUrl ||
                                        "/default-avatar.png"
                                    }
                                    alt={comment.author.name}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                                />
                                <div>
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
                            </div>

                            {/* Comment Body */}
                            <p className="text-gray-800 dark:text-gray-200">
                                {comment.body}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 sm:mt-0">
                                {format(new Date(comment.createdAt), "PPP")}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Comments;
