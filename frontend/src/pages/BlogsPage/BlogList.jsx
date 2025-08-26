import BlogCard from "../../components/BlogCard";
import BlogCardSkeleton from "../../skeletons/BlogCardSkeleton";

function BlogList({ blogs, loading, limit }) {
    if (loading) {
        return (
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 dark:border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {Array.from({ length: limit }).map((_, i) => (
                    <BlogCardSkeleton key={i} />
                ))}
            </div>
        );
    }
    return (
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 dark:border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blogs.map((blog) => (
                <BlogCard blog={blog} key={blog._id} />
            ))}
        </div>
    );
}

export default BlogList;
