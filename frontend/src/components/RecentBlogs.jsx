import { useState, useEffect } from "react";
import { format } from "date-fns";

import api from "../utils/axiosConfig";

import RecentBlogsSkeleton from "../skeletons/RecentBlogsSkeleton";

function RecentBlogs() {
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchRecentBlogs() {
        try {
            const res = await api.get("/posts?limit=5");
            setRecentBlogs(res.data.data.blogs);
        } catch (err) {
            console.error("Error fetching recent blogs:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRecentBlogs();
    }, []);

    if (loading) {
        return <RecentBlogsSkeleton />;
    }

    return (
        <div className="space-y-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-colors duration-300">
            <h3 className="text-xl font-semibold pl-4 border-l-4 border-blue-500 text-gray-900 dark:text-white">
                Recent Posts
            </h3>
            <ul className="space-y-4">
                {recentBlogs.map((blog) => (
                    <li key={blog._id}>
                        <a
                            href={`/blogs/${blog._id}`}
                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-32 h-auto rounded object-cover flex-shrink-0"
                            />

                            <div className="flex flex-col justify-between">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-3">
                                    {blog.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {format(new Date(blog.createdAt), "PPP")}
                                </p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentBlogs;
