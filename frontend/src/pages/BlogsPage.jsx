import axios from "axios";
import { useState, useEffect } from "react";

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
                return (
                    <div key={blog._id}>
                        {console.log(blog)}
                        <p>Title: {blog.title}</p>
                        <p>Blog Content: {blog.body}</p>
                        <p>Blog Author: {blog.author}</p>
                        <p>{blog.likes.length} likes</p>
                        <p>{blog.comments.length} comments</p>
                    </div>
                );
            })}
        </div>
    );
}

export default BlogsPage;
