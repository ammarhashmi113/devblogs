import { Link } from "react-router-dom";

import { useUser } from "../contexts/userContext";
import LikeButton from "../components/LikeButton";
import { UserRound, Clock, MessageSquare } from "lucide-react";

function BlogMainContent({ blog, blogLikedByUser, handleDelete, loading }) {
    const { user, userLoading } = useUser();

    const isAuthor = user?._id === blog.author?._id;
    return (
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
    );
}

export default BlogMainContent;
