export default function TagsList({ tags }) {
    return (
        <div className="space-y-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold pl-4 border-l-4 border-blue-500">
                Tags
            </h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm text-blue-600 bg-blue-50"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
