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
        <div>
            {blogs.map((blog) => {
                return <BlogCard key={blog._id} blog={blog}></BlogCard>;
            })}
        </div>
    );
}

export default BlogsPage;
