import { useNavigate } from "react-router-dom";
import { Calendar, Pencil, Mail } from "lucide-react";

import { useUser } from "../contexts/userContext";

function ProfilePage() {
    const { user, userLoading } = useUser();
    const navigate = useNavigate();

    if (userLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-500">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="bg-white shadow rounded-2xl p-6 sm:p-10 relative">
                    {/* Edit button */}
                    <button
                        onClick={() => navigate("/profile/edit")}
                        className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                    >
                        <Pencil size={16} /> Edit
                    </button>

                    {/* Avatar + Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                        <img
                            src={user.imageUrl}
                            alt={user.name}
                            className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md"
                        />
                        <div className="mt-4 sm:mt-0">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {user.name}
                            </h1>
                            <p className="text-gray-600">@{user.username}</p>
                            <p className="text-sm font-medium text-indigo-600 mt-1">
                                {user.role}
                            </p>
                        </div>
                    </div>

                    {/* About */}
                    {user.about && (
                        <div className="mt-6 border-t pt-6">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                About
                            </h2>
                            <p className="mt-2 text-gray-700 leading-relaxed">
                                {user.about}
                            </p>
                        </div>
                    )}

                    {/* Extra info */}
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-400" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" />
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
