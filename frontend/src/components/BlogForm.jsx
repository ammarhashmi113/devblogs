import { FileText, Image, Tag, Folder, Type } from "lucide-react";
import { useState, useEffect } from "react";

function BlogForm({ initialValues, onSubmit, loading, error }) {
    const [title, setTitle] = useState(initialValues?.title || "");
    const [body, setBody] = useState(initialValues?.body || "");
    const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl || "");
    const [category, setCategory] = useState(initialValues?.category || "");
    const [tags, setTags] = useState(initialValues?.tags?.join(", ") || "");

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
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500">{error}</p>}

            {/* Title */}
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    <Type className="w-4 h-4" /> Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-2 block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600"
                    placeholder="Enter blog title"
                />
            </div>

            {/* Body */}
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    <FileText className="w-4 h-4" /> Body
                </label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    rows={6}
                    className="mt-2 block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600"
                    placeholder="Write your blog content..."
                />
            </div>

            {/* Image */}
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    <Image className="w-4 h-4" /> Image URL
                </label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="mt-2 block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600"
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            {/* Category */}
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    <Folder className="w-4 h-4" /> Category
                </label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="mt-2 block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600"
                    placeholder="E.g. Web Development"
                />
            </div>

            {/* Tags */}
            <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    <Tag className="w-4 h-4" /> Tags
                </label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    required
                    className="mt-2 block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600"
                    placeholder="tag1, tag2, tag3"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 disabled:opacity-50"
            >
                {loading ? "Saving..." : "Save Blog"}
            </button>
        </form>
    );
}

export default BlogForm;
