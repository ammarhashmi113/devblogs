import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Clock, MessageSquare, Pencil, Trash } from "lucide-react";

import { useUser } from "../contexts/userContext";

import LikeButton from "../components/LikeButton";
import ConfirmationModal from "./ConfirmationModal";

function BlogMainContent({ blog, blogLikedByUser, handleDelete, loading }) {
    const { user, userLoading } = useUser();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const isAuthor = user?._id === blog.author?._id;
    return (
        <>
            <div className="lg:col-span-2 space-y-8">
                {/* BLOG MAIN CONTENT */}
                <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
                    <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <h1 className="text-3xl font-bold leading-snug text-gray-900 dark:text-white">
                    {blog.title}
                </h1>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4 sm:space-x-6">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <UserRound className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">
                            {blog.author.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">
                            {blog.comments.length} Comments
                        </span>
                    </div>
                </div>

                <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none whitespace-pre-line">
                    {blog.body}
                </div>

                {/* ✅ Only author sees Edit/Delete */}
                {isAuthor && (
                    <div className="flex gap-4 mt-6">
                        <Link
                            to={`/blogs/${blog._id}/edit`}
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-400 dark:hover:bg-indigo-900/60 transition"
                        >
                            <Pencil size={16} /> Edit
                        </Link>
                        <button
                            onClick={() => {
                                setShowDeleteModal(true);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-900/60 transition cursor-pointer"
                        >
                            <Trash size={16} /> Delete
                        </button>
                    </div>
                )}

                {!isAuthor && (
                    <div className="flex items-center justify-end gap-4 mt-6 mx-6">
                        <LikeButton
                            targetId={blog._id}
                            type="posts"
                            initialLiked={blogLikedByUser}
                            initialCount={blog.likes.length}
                        />
                    </div>
                )}
            </div>
            {/* Dlete Confirmation Modal */}
            <ConfirmationModal
                show={showDeleteModal}
                message="Are you sure you want to delete this blog? This action cannot be undone."
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={() => {
                    setShowDeleteModal(false);
                    handleDelete();
                }}
            />
        </>
    );
}

export default BlogMainContent;
