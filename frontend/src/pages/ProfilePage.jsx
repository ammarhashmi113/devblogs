import { useNavigate } from "react-router-dom";
import { Calendar, Pencil, Mail } from "lucide-react";
import { useUser } from "../contexts/userContext";

function ProfilePage() {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="bg-gray-50 dark:bg-gray-800 shadow rounded-2xl p-6 sm:p-10 relative">
                    {/* Edit button */}
                    <button
                        onClick={() => navigate("/profile/edit")}
                        className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-400 dark:hover:bg-indigo-900/60 transition cursor-pointer"
                    >
                        <Pencil size={16} /> Edit
                    </button>

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
                                {user.role}
                            </p>
                        </div>
                    </div>

                    {/* About */}
                    {user.about && (
                        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                About
                            </h2>
                            <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                                {user.about}
                            </p>
                        </div>
                    )}

                    {/* Extra info */}
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <Mail
                                size={16}
                                className="text-gray-400 dark:text-gray-500"
                            />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar
                                size={16}
                                className="text-gray-400 dark:text-gray-500"
                            />
                            <span>
                                Joined{" "}
                                {new Date(user.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                    }
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
