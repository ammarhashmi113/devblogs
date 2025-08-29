import BlogCard from "../../components/BlogCard";
import BlogCardSkeleton from "../../skeletons/BlogCardSkeleton";

function BlogList({ blogs, loading, limit }) {
    if (loading) {
        return (
            <>
                {Array.from({ length: limit }).map((_, i) => (
                    <BlogCardSkeleton key={i} />
                ))}
            </>
        );
    }
    return (
        <>
            {blogs.map((blog) => (
                <BlogCard blog={blog} key={blog._id} />
            ))}
        </>
    );
}

export default BlogList;
