export default function TagsList({ tags }) {
    return (
        <div className="space-y-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-300">
            <h3 className="text-xl font-semibold pl-4 border-l-4 border-blue-500 text-gray-900 dark:text-white">
                Tags
            </h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm text-blue-700 bg-blue-100 dark:text-blue-200 dark:bg-blue-900"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
