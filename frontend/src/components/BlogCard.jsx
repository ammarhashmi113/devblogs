import { Heart, MessageCircle, User, Calendar } from "lucide-react";

function BlogCard({ blog }) {
    const { title, body, author, createdAt, likes, comments } = blog;

    return (
        <div className="bg-white shadow-md rounded-xl p-6 mb-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900 leading-snug hover:text-blue-600 transition-colors duration-200">
                {title}
            </h2>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{author.username}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{likes.length}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    <span>{comments.length}</span>
                </div>
            </div>

            {/* Body Preview */}
            <p className="text-gray-700 mb-4 leading-relaxed">
                {body.slice(0, 200)}
                {body.length > 200 && "..."}
            </p>
        </div>
    );
}

export default BlogCard;
