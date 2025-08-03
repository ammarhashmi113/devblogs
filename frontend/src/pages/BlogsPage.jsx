import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto lg:mx-0 text-center">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                        Explore Latest Blogs
                    </h2>
                    <p className="mt-2 text-lg/8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <article
                            key={blog._id}
                            className="flex max-w-xl flex-col items-start justify-between"
                        >
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="rounded-2xl mb-6"
                            />
                            <div className="flex items-center gap-x-4 text-xs">
                                <span className="text-gray-500">
                                    {new Date(
                                        blog.createdAt
                                    ).toLocaleDateString()}
                                </span>
                                {blog.tags.map((tag) => {
                                    return (
                                        <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                            {tag}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="group relative grow">
                                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                    <Link to={`/blogs/${blog._id}`}>
                                        <span className="absolute inset-0" />
                                        {blog.title}
                                    </Link>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                                    {blog.body}
                                </p>
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                                {/* <img
                                    alt=""
                                    src={post.author.imageUrl}
                                    className="size-10 rounded-full bg-gray-50"
                                /> */}
                                <div className="text-sm/6">
                                    <p className="font-semibold text-gray-900">
                                        <a href="#">
                                            <span className="absolute inset-0" />
                                            {blog.author.username}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">
                                        {"post.author.role"}
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
