import { Heart, MessageCircle, User, Calendar } from "lucide-react";

import { Link } from "react-router-dom";

function BlogCard({ blog }) {
    const {
        _id,
        title,
        body,
        author,
        tags,
        imageUrl,
        createdAt,
        likes,
        comments,
    } = blog;

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            {/* Image */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-40 object-cover"
            />

            <div className="p-6">
                {/* Title */}
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 leading-snug line-clamp-2">
                    {title}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

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
                <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                    {body}
                </p>

                {/* Read more */}
                <div className="text-right">
                    <Link
                        to={`/blogs/${_id}`}
                        className="inline-block px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    >
                        Read More →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
