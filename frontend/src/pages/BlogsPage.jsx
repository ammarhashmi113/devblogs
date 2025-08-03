import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import BlogCard from "../components/BlogCard";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Blogposts from API and store them in state variable
    async function fetchBlogs() {
        try {
            const res = await axios.get(`${apiUrl}/posts`);
            console.log(res.data.data.blogs);
            setBlogs(res.data.data.blogs);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        } finally {
            setLoading(false);
        }
    }

    // This useEffect with empty dependency array will run everytime the BlogsPage component render
    useEffect(() => {
        fetchBlogs();
    }, []);

    if (loading) return <div>Blogs Loading</div>;

    return (
        <div className="bg-white dark:bg-gray-900 py-24 sm:py-32 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto lg:mx-0 text-center">
                    <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        Explore Latest Blogs
                    </h2>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                        Learn how to grow your business with our expert advice.
                    </p>
                </div>

                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 dark:border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <article
                            key={blog._id}
                            className="flex flex-col justify-between bg-white dark:bg-gray-900 p-6 max-w-xl mx-auto transition-all"
                        >
                            {/* Blog Image with dark overlay */}
                            <div className="relative">
                                <img
                                    src={blog.imageUrl}
                                    alt={`Banner for ${blog.title}`}
                                    className="w-full h-48 object-cover rounded-xl mb-5"
                                />
                                <div className="absolute top-0 left-0 w-full h-48 rounded-xl bg-black/10 dark:bg-black/30" />
                            </div>

                            {/* Date + Category */}
                            <div className="flex items-center gap-x-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                                <span>
                                    {format(new Date(blog.createdAt), "PPP")}
                                </span>
                                <span className="inline-block bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 font-medium px-3 py-1 rounded-full capitalize">
                                    {blog.category}
                                </span>
                            </div>

                            {/* Title + Snippet */}
                            <div className="flex flex-col grow">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-2 line-clamp-2">
                                    <Link to={`/blogs/${blog._id}`}>
                                        {blog.title}
                                    </Link>
                                </h3>

                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                                    {blog.body.split("\n")[0].slice(0, 200)}...
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {blog.tags?.slice(0, 3).map((tag) => (
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
                            <div className="flex items-center gap-x-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <img
                                    src={
                                        blog.author.imageUrl ||
                                        "/default-avatar.png"
                                    }
                                    alt={blog.author.name}
                                    className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {blog.author.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {blog.author.role}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
