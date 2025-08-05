export default function AuthorCard({ author }) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-center">
            <img
                src={author.imageUrl}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
                alt={author.name}
            />
            <h4 className="text-lg font-semibold">{author.name}</h4>
            <p className="text-sm text-gray-500">{author.role}</p>
            <p className="text-sm text-gray-500">{author.body}</p>
            {/* Optional social links */}
        </div>
    );
}
