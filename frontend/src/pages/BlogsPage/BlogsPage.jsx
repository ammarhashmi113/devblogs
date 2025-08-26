import { useState, useEffect, Fragment } from "react";

import { useUser } from "../../contexts/userContext";
import api from "../../utils/axiosConfig";

import BlogFilters from "./BlogFilters";
import BlogList from "./BlogList";
import Pagination from "./Pagination";

import BlogCard from "../../components/BlogCard";
import BlogCardSkeleton from "../../skeletons/BlogCardSkeleton";
import { Combobox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

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
        tag: "",
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
                ...(filters.tag && { tag: filters.tag }),
            };
            const res = await api.get("/posts", { params });
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
                    <BlogFilters filters={filters} setFilters={setFilters} />
                </div>
                <BlogList blogs={blogs} loading={loading} limit={limit} />
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
