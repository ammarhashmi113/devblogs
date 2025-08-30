// components/ProfileLayout.jsx
import { Tab } from "@headlessui/react";
import {
    FileText,
    MessageCircle,
    Heart,
    Calendar,
    Mail,
    Pencil,
    Loader2,
} from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";

function ProfilePageLayout({
    user,
    activity,
    type,
    setType,
    page,
    setPage,
    showEdit,
    loadingActivity,
}) {
    const navigate = useNavigate();
    const currentActivity = activity[type].results;
    const pagination = activity[type].pagination;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Profile Card or Skeleton */}
                {!user ? (
                    <LoadingSpinner label="Loading Profile" />
                ) : (
                    <div className="relative bg-gray-50 dark:bg-gray-800 shadow rounded-2xl p-6 sm:p-10">
                        {/* Edit button (optional) */}
                        {showEdit && (
                            <button
                                onClick={() => navigate("/profile/edit")}
                                className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-600 
              hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-400 dark:hover:bg-indigo-900/60 transition cursor-pointer"
                            >
                                <Pencil size={16} /> Edit
                            </button>
                        )}

                        {/* Avatar + Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                            <img
                                src={user.imageUrl}
                                alt={user.name}
                                className="w-24 h-24 rounded-full object-cover ring-4 ring-white dark:ring-gray-900 shadow-md"
                            />
                            <div className="mt-4 sm:mt-0">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {user.name}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    @{user.username}
                                </p>
                                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1">
                                    {user.role || "Member"}
                                </p>
                            </div>
                        </div>

                        {/* About */}
                        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                About
                            </h2>
                            <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                                {user.about ||
                                    "This user hasn’t written a bio yet."}
                            </p>
                        </div>

                        {/* Extra info */}
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
                            {user.email && (
                                <div className="flex items-center gap-2">
                                    <Mail
                                        size={16}
                                        className="text-gray-400 dark:text-gray-500"
                                    />
                                    <span>{user.email}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Calendar
                                    size={16}
                                    className="text-gray-400 dark:text-gray-500"
                                />
                                <span>
                                    Joined{" "}
                                    {format(
                                        new Date(user.createdAt),
                                        "MMMM yyyy"
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Activity Section */}
                <div className="mt-10">
                    <Tab.Group
                        selectedIndex={["blogs", "comments", "likes"].indexOf(
                            type
                        )}
                        onChange={(index) => {
                            const keys = ["blogs", "comments", "likes"];
                            setType(keys[index]);
                        }}
                    >
                        <Tab.List className="flex space-x-4 border-b mb-6">
                            {[
                                {
                                    key: "blogs",
                                    label: "Blogs",
                                    icon: FileText,
                                },
                                {
                                    key: "comments",
                                    label: "Comments",
                                    icon: MessageCircle,
                                },
                                { key: "likes", label: "Likes", icon: Heart },
                            ].map((tab) => (
                                <Tab
                                    key={tab.key}
                                    className={({ selected }) =>
                                        clsx(
                                            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-md focus:outline-none focus:ring-0",
                                            selected
                                                ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
                                                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        )
                                    }
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </Tab>
                            ))}
                        </Tab.List>
                    </Tab.Group>

                    <div className="space-y-4">
                        {loadingActivity ? (
                            // LOADING STATE
                            <div className="flex justify-center items-center py-10">
                                <Loader2 className="h-6 w-6 animate-spin text-gray-500 dark:text-gray-400" />
                                <span className="ml-2 text-gray-500 dark:text-gray-400">
                                    Loading {type}
                                </span>
                            </div>
                        ) : currentActivity.length === 0 ? (
                            // EMPTY STATE
                            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                                No {type} yet.
                            </div>
                        ) : (
                            // DATA STATE
                            <>
                                {type === "blogs" &&
                                    currentActivity.map((b) => (
                                        <div
                                            key={b._id}
                                            className="p-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:shadow-md transition"
                                        >
                                            <a href={`/blogs/${b._id}`}>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {b.title}
                                                </h3>
                                            </a>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                                {b.body?.slice(0, 120)}...
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2">
                                                {format(
                                                    new Date(b.createdAt),
                                                    "PPP"
                                                )}
                                            </p>
                                        </div>
                                    ))}

                                {type === "comments" &&
                                    currentActivity.map((c) => (
                                        <div
                                            key={c._id}
                                            className="p-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:shadow-md transition"
                                        >
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {c.body}
                                            </p>
                                            <a href={`/blogs/${c.blog?._id}`}>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                    on{" "}
                                                    <span className="font-medium">
                                                        {c.blog?.title}
                                                    </span>
                                                </p>
                                            </a>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {format(
                                                    new Date(c.createdAt),
                                                    "PPP"
                                                )}
                                            </p>
                                        </div>
                                    ))}

                                {type === "likes" &&
                                    currentActivity.map((l) => (
                                        <div
                                            key={l._id}
                                            className="p-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:shadow-md transition"
                                        >
                                            <a href={`/blogs/${l.blog?._id}`}>
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    ❤️ Liked{" "}
                                                    <span className="font-semibold">
                                                        {l.blog?.title}
                                                    </span>
                                                </p>
                                            </a>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                by{" "}
                                                {l.blog?.author?.name ||
                                                    "Unknown"}
                                            </p>
                                        </div>
                                    ))}
                            </>
                        )}
                    </div>

                    {/* Load More */}
                    {pagination && pagination.page < pagination.totalPages && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() =>
                                    setPage((prev) => ({
                                        ...prev,
                                        [type]: prev[type] + 1,
                                    }))
                                }
                                className="px-5 py-2 text-sm font-medium rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePageLayout;
