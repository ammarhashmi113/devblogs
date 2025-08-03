import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// function BlogsPage() {
//     const [blogs, setBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Fetch Blogposts from API and store them in state variable
//     async function fetchBlogs() {
//         try {
//             const res = await axios.get(`${apiUrl}/posts`);
//             setBlogs(res.data.data.blogs);
//         } catch (err) {
//             console.error("Error fetching blogs:", err);
//         } finally {
//             setLoading(false);
//         }
//     }

//     // This useEffect with empty dependency array will run everytime the BlogsPage component render
//     useEffect(() => {
//         fetchBlogs();
//     }, []);

//     if (loading) return <div>Blogs Loading</div>;

//     return (
//         <div className="max-w-6xl mx-auto px-4 py-10">
//             <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
//                 Latest Blogs
//             </h1>

//             <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                 {blogs.map((blog) => (
//                     <BlogCard key={blog._id} blog={blog} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default BlogsPage;

const posts = [
    {
        id: 1,
        title: "Boost your conversion rate",
        href: "#",
        description:
            "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
        date: "Mar 16, 2020",
        datetime: "2020-03-16",
        category: { title: "Marketing", href: "#" },
        author: {
            name: "Michael Foster",
            role: "Co-Founder / CTO",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
    {
        id: 2,
        title: "How to use search engine optimization to drive sales",
        href: "#",
        description:
            "Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.",
        date: "Mar 10, 2020",
        datetime: "2020-03-10",
        category: { title: "Sales", href: "#" },
        author: {
            name: "Lindsay Walton",
            role: "Front-end Developer",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
    {
        id: 3,
        title: "Improve your customer experience",
        href: "#",
        description:
            "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis. Nostrud sint anim sunt aliqua. Nulla eu labore irure incididunt velit cillum quis magna dolore.",
        date: "Feb 12, 2020",
        datetime: "2020-02-12",
        category: { title: "Business", href: "#" },
        author: {
            name: "Tom Cook",
            role: "Director of Product",
            href: "#",
            imageUrl:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    },
];

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Blogposts from API and store them in state variable
    async function fetchBlogs() {
        try {
            const res = await axios.get(`${apiUrl}/posts`);
            console.log(res.data.data.blogs);
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
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto lg:mx-0 text-center">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                        Explore Latest Blogs
                    </h2>
                    <p className="mt-2 text-lg/8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <article
                            key={blog._id}
                            className="flex max-w-xl flex-col items-start justify-between"
                        >
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="rounded-2xl mb-6"
                            />
                            <div className="flex items-center gap-x-4 text-xs">
                                <span className="text-gray-500">
                                    {new Date(
                                        blog.createdAt
                                    ).toLocaleDateString()}
                                </span>
                                {blog.tags.map((tag) => {
                                    return (
                                        <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                            {tag}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="group relative grow">
                                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                    <Link to={`/blogs/${blog._id}`}>
                                        <span className="absolute inset-0" />
                                        {blog.title}
                                    </Link>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                                    {blog.body}
                                </p>
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                                {/* <img
                                    alt=""
                                    src={post.author.imageUrl}
                                    className="size-10 rounded-full bg-gray-50"
                                /> */}
                                <div className="text-sm/6">
                                    <p className="font-semibold text-gray-900">
                                        <a href="#">
                                            <span className="absolute inset-0" />
                                            {blog.author.username}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">
                                        {"post.author.role"}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
