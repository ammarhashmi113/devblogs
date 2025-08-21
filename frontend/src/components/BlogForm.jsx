import { useState, useEffect } from "react";

function BlogForm({ initialValues, onSubmit, loading, error }) {
    const [title, setTitle] = useState(initialValues?.title || "");
    const [body, setBody] = useState(initialValues?.body || "");
    const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl || "");
    const [category, setCategory] = useState(initialValues?.category || "");
    const [tags, setTags] = useState(initialValues?.tags?.join(", ") || "");

    // Whenever initialValues change (like when editing), update state
    useEffect(() => {
        if (initialValues) {
            setTitle(initialValues.title || "");
            setBody(initialValues.body || "");
            setImageUrl(initialValues.imageUrl || "");
            setCategory(initialValues.category || "");
            setTags(initialValues.tags?.join(", ") || "");
        }
    }, [initialValues]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            title,
            body,
            imageUrl,
            category,
            tags: tags.split(",").map((tag) => tag.trim()),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                required
            />

            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 h-40"
                required
            />

            <input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                required
            />

            <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Saving..." : "Save Blog"}
            </button>
        </form>
    );
}

export default BlogForm;
