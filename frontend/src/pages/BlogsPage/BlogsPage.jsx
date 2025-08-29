import { useState, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Disclosure } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import qs from "qs";

import { useUser } from "../../contexts/userContext";
import api from "../../utils/axiosConfig";

import BlogFilters from "./BlogFilters";
import BlogList from "./BlogList";
import Pagination from "./Pagination";

function BlogsPage() {
    const { user, userLoading } = useUser();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        mine: false,
        category: "",
        tags: [],
    });

    useEffect(() => {
        if (!userLoading) fetchBlogs();
    }, [page, filters, userLoading]);
    useEffect(() => {
        setPage(1);
    }, [filters]);

    async function fetchBlogs() {
        setLoading(true);
        try {
            const params = {
                page,
                limit,
                ...(filters.mine && user && { mine: true }),
                ...(filters.category && { category: filters.category }),
                ...(filters.tags.length && { tag: filters.tags }),
            };
            const res = await api.get("/posts", {
                params,
                paramsSerializer: (params) =>
                    qs.stringify(params, { arrayFormat: "repeat" }),
            });
            setBlogs(res.data.data.blogs);
            setTotalPages(res.data.data.pagination.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

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
                <Disclosure>
                    {({ open }) => (
                        <div>
                            <Disclosure.Button
                                className="flex items-center gap-2 px-3 py-2 mt-6 text-sm font-medium rounded-md 
          bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 
          hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
                            >
                                <Filter size={16} />
                                <span>Filters</span>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${
                                        open ? "rotate-180" : ""
                                    }`}
                                />
                            </Disclosure.Button>
                            <AnimatePresence initial={false}>
                                {open && (
                                    <motion.div
                                        key="filters-panel"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Disclosure.Panel
                                            static
                                            className="mt-6 border-b border-gray-200 dark:border-gray-700"
                                        >
                                            <BlogFilters
                                                filters={filters}
                                                setFilters={setFilters}
                                            />
                                        </Disclosure.Panel>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </Disclosure>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <BlogList blogs={blogs} loading={loading} limit={limit} />
                </div>

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </div>
        </div>
    );
}

export default BlogsPage;
