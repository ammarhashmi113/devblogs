import { Link } from "react-router-dom";
import { format } from "date-fns";

function BlogCard({ blog }) {
    const { _id, title, body, author, tags, imageUrl, createdAt, category } =
        blog;

    return (
        <article className="flex flex-col justify-between bg-white dark:bg-gray-900 p-6 max-w-xl mx-auto transition-all">
            {/* Blog Image with dark overlay */}
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={`Banner for ${title}`}
                    className="w-full h-48 object-cover rounded-xl mb-5"
                />
                <div className="absolute top-0 left-0 w-full h-48 rounded-xl bg-black/10 dark:bg-black/30" />
            </div>

            {/* Date + Category */}
            <div className="flex items-center gap-x-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span>{format(new Date(createdAt), "PPP")}</span>
                <span className="inline-block bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 font-medium px-3 py-1 rounded-full capitalize">
                    {category}
                </span>
            </div>

            {/* Title + Snippet */}
            <div className="flex flex-col grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-2 line-clamp-2">
                    <Link to={`/blogs/${_id}`}>{title}</Link>
                </h3>

                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                    {body.split("\n")[0].slice(0, 200)}...
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags?.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-x-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 block group">
                <img
                    src={author.imageUrl || "/default-avatar.png"}
                    alt={author.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                />
                <div>
                    <a
                        href={`/users/${author.username}`}
                        className="group-hover:underline"
                    >
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {author.name}
                        </p>
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {author.role}
                    </p>
                </div>
            </div>
        </article>
    );
}

export default BlogCard;
