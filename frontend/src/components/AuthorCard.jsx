export default function AuthorCard({ author }) {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center transition-colors duration-300">
            <img
                src={author.imageUrl || "/default-avatar.png"}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border border-gray-300 dark:border-gray-700"
                alt={author.name}
            />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {author.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {author.role}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {author.body}
            </p>
            {/* Optional social links */}
        </div>
    );
}
