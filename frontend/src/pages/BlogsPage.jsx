import axios from "axios";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Blogposts from API and store them in state variable
    async function fetchBlogs() {
        try {
            const res = await axios.get("http://localhost:3000/api/posts");
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
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
                Latest Blogs
            </h1>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </div>
    );
}

export default BlogsPage;
