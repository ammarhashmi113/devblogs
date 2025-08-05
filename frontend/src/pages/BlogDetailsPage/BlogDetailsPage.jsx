import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserRound, Clock, MessageSquare } from "lucide-react";

import AuthorCard from "./AuthorCard";
import RecentBlogPosts from "./RecentBlogs";
import TagsList from "./TagsList";
import Comments from "./Comments";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

function BlogDetailsPage() {
    const { id } = useParams(); // blospost id
    const [blog, setBlog] = useState({});
    const [recentPosts, setRecentPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    async function fetchBlog() {
        try {
            const res = await axios.get(`${apiUrl}/posts/${id}`);
            setBlog(res.data.data.blog);
        } catch (err) {
            console.error("Error fetching blog:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    if (loading) {
        return <p>Blog is Loading...</p>;
    }

    if (!blog)
        return <p className="text-center mt-8 text-red-500">Blog not found</p>;

    const {
        _id,
        title,
        body,
        imageUrl,
        createdAt,
        author,
        tags,
        likes,
        comments,
    } = blog;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* MAIN CONTENT */}
                <div className="lg:col-span-2 space-y-8">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-auto rounded-lg"
                    />

                    <h1 className="text-3xl font-bold leading-snug">{title}</h1>

                    <div className="flex items-center text-sm text-gray-500 space-x-6">
                        <div className="flex items-center gap-2">
                            <UserRound className="w-4 h-4" />
                            <span>{author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                                {new Date(createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            <span>{comments.length} Comments</span>
                        </div>
                    </div>

                    <div className="prose max-w-none whitespace-pre-line">
                        {body}
                    </div>
                    {/* COMMENT SECTION */}
                    <Comments id={_id} />
                </div>

                {/* SIDEBAR */}
                <aside className="space-y-8">
                    <AuthorCard author={author} />
                    <RecentBlogPosts />
                    <TagsList tags={tags} />
                </aside>
            </div>
        </div>
    );
}

export default BlogDetailsPage;
