import { useState, useEffect } from "react";

import { useUser } from "../contexts/userContext";
import api from "../utils/axiosConfig";

import BlogCard from "../components/BlogCard";

import BlogCardSkeleton from "../skeletons/BlogCardSkeleton";

export default function BlogsPage() {
    const { user, userLoading } = useUser();

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        mine: false,
        category: "",
        tag: "",
    });

    async function fetchBlogs() {
        setLoading(true);
        try {
            const params = {
                page,
                limit,
                ...(filters.mine && user && { mine: true }),
                ...(filters.category && { category: filters.category }),
                ...(filters.tag && { tag: filters.tag }),
            };

            const res = await api.get("/posts", { params });
            setBlogs(res.data.data.blogs);
            setTotalPages(res.data.data.pagination.totalPages);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!userLoading) {
            fetchBlogs();
        }
    }, [page, filters, userLoading]); // refetch once user is loaded

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

                    {/* Filters */}
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        {user && (
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={filters.mine}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            mine: e.target.checked,
                                        }))
                                    }
                                    className="rounded border-gray-300"
                                />
                                My Blogs
                            </label>
                        )}
                        <input
                            type="text"
                            placeholder="Category"
                            value={filters.category}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    category: e.target.value,
                                }))
                            }
                            className="rounded border border-gray-300 px-2 py-1"
                        />
                        <input
                            type="text"
                            placeholder="Tag"
                            value={filters.tag}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    tag: e.target.value,
                                }))
                            }
                            className="rounded border border-gray-300 px-2 py-1"
                        />
                    </div>
                </div>

                {/* Blog Cards */}
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 dark:border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {loading &&
                        Array.from({ length: limit }).map((_, i) => (
                            <BlogCardSkeleton key={i} />
                        ))}
                    {!loading &&
                        blogs.map((blog) => (
                            <BlogCard blog={blog} key={blog._id} />
                        ))}
                </div>

                {/* Pagination */}
                <div className="mt-10 flex justify-center gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="px-4 py-2">
                        {page} / {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
