import { useState, useEffect, Fragment } from "react";
import { useUser } from "../contexts/userContext";
import api from "../utils/axiosConfig";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../skeletons/BlogCardSkeleton";
import { Combobox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

const CATEGORIES = [
    "javascript",
    "react",
    "nextjs",
    "nodejs",
    "express",
    "mongodb",
    "html",
    "css",
    "ui/ux",
    "tailwind",
    "devops",
    "testing",
    "ai",
    "ml",
    "data-science",
    "career",
    "other",
];

export default function BlogsPage() {
    const { user, userLoading } = useUser();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const [categoryQuery, setCategoryQuery] = useState("");

    const [filters, setFilters] = useState({
        mine: false,
        category: "",
        tag: "",
    });
    const [tagInput, setTagInput] = useState("");

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

    // Filter categories based on input
    const filteredCategories =
        categoryQuery === ""
            ? CATEGORIES
            : CATEGORIES.filter((cat) =>
                  cat.toLowerCase().includes(categoryQuery.toLowerCase())
              );

    useEffect(() => {
        if (!userLoading) fetchBlogs();
    }, [page, filters, userLoading]);
    useEffect(() => {
        setPage(1);
    }, [filters]);

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

                    {/* Fancy Filters */}
                    <div className="mt-6 flex flex-wrap justify-center gap-4 items-center">
                        {/* My Blogs Toggle */}
                        {user && (
                            <label className="inline-flex relative items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={filters.mine}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            mine: e.target.checked,
                                        }))
                                    }
                                />
                                <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-all duration-300"></div>
                                <span className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
                                    My Blogs
                                </span>
                            </label>
                        )}

                        {/* Category Dropdown */}
                        <Combobox
                            value={filters.category}
                            onChange={(val) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    category: val,
                                }))
                            }
                        >
                            <div className="relative w-48">
                                <div className="relative cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
                                    <Combobox.Input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        displayValue={(cat) => cat}
                                        placeholder="Select Category"
                                        onChange={(e) =>
                                            setCategoryQuery(e.target.value)
                                        } // ← this makes typing work
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    </Combobox.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                                        {filteredCategories.map((cat) => (
                                            <Combobox.Option
                                                key={cat}
                                                value={cat}
                                                className={({ active }) =>
                                                    `cursor-default select-none relative px-4 py-2 ${
                                                        active
                                                            ? "bg-blue-500 text-white"
                                                            : "text-gray-900"
                                                    }`
                                                }
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${
                                                                selected
                                                                    ? "font-medium"
                                                                    : "font-normal"
                                                            }`}
                                                        >
                                                            {cat}
                                                        </span>
                                                        {selected && (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                                <Check className="w-5 h-5" />
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                </Transition>
                            </div>
                        </Combobox>

                        {/* Tag Input */}
                        <input
                            type="text"
                            placeholder="Filter by Tag"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    tagInput.trim() !== ""
                                ) {
                                    setFilters((prev) => ({
                                        ...prev,
                                        tag: tagInput.trim().toLowerCase(),
                                    }));
                                    setTagInput("");
                                }
                            }}
                            className="rounded border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Active Filter Chips */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {filters.category && (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                                {filters.category}
                                <button
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            category: "",
                                        }))
                                    }
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                        {filters.tag && (
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1">
                                {filters.tag}
                                <button
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            tag: "",
                                        }))
                                    }
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                        {filters.mine && (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
                                My Blogs
                                <button
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            mine: false,
                                        }))
                                    }
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                    </div>
                </div>

                {/* Blog Cards & Pagination (same as before) */}
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
