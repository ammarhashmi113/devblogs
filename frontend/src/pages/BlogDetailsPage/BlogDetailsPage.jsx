import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

import api from "../../utils/axiosConfig";

import AuthorCard from "../../components/AuthorCard";
import RecentBlogPosts from "../../components/RecentBlogs";
import TagsList from "../../components/TagsList";
import Comments from "../../components/Comments";
import BlogMainContent from "../../components/BlogMainContent";

import BlogMainContentSkeleton from "../../skeletons/BlogMainContentSkeleton";
import AuthorCardSkeleton from "../../skeletons/AuthorCardSkeleton";
import RecentBlogsSkeleton from "../../skeletons/RecentBlogsSkeleton";
import TagsListSkeleton from "../../skeletons/TagsListSkeleton";

function BlogDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [blogLikedByUser, setBlogLikedByUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchBlog() {
        try {
            const res = await api.get(`/posts/${id}`);
            setBlog(res.data.data.blog);
            setBlogLikedByUser(res.data.data.likedByUser);
        } catch (err) {
            console.error("Error fetching blog:", err);
            setError("Failed to fetch blog");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?"))
            return;
        try {
            await api.delete(`/posts/${id}`);
            navigate("/");
        } catch (err) {
            console.error("Delete failed:", err);
            setError(err.response?.data?.message || "Failed to delete blog");
        }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <div className="container mx-auto px-4 py-10">
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
                        {/* Home link */}
                        <Link
                            to="/"
                            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            <span>Blogs</span>
                        </Link>

                        {/* Separator */}
                        <ChevronRight className="w-4 h-4" />

                        {/* Current page Placeholder */}
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* BLOG MAIN CONTENT*/}
                            <BlogMainContentSkeleton />

                            {/* COMMENT SECTION */}
                            {/* <Comments id={blog._id} /> */}
                        </div>

                        {/* SIDEBAR */}
                        <aside className="space-y-8">
                            <AuthorCardSkeleton />
                            <RecentBlogsSkeleton />
                            <TagsListSkeleton />
                        </aside>
                    </div>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <p className="text-center mt-8 text-red-500 dark:text-red-400">
                Blog not found
            </p>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="container mx-auto px-4 py-10">
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {/* Home link */}
                    <Link
                        to="/"
                        className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        <span>Blogs</span>
                    </Link>

                    {/* Separator */}
                    <ChevronRight className="w-4 h-4" />

                    {/* Current page (truncate if long) */}
                    <span className="truncate max-w-[200px]">{blog.title}</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <BlogMainContent
                            blog={blog}
                            blogLikedByUser={blogLikedByUser}
                            handleDelete={handleDelete}
                            loading={loading}
                        />

                        {/* COMMENT SECTION */}
                        <Comments id={blog._id} />
                    </div>

                    {/* SIDEBAR */}
                    <aside className="space-y-8">
                        <AuthorCard author={blog.author} />
                        <RecentBlogPosts />
                        <TagsList tags={blog.tags} />
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default BlogDetailsPage;
