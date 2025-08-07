import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../utils/axiosConfig";
import { useUser } from "../contexts/userContext";

function ProfileForm({ mode = "edit" }) {
    const { user, userLoading, setUser } = useUser();
    const navigate = useNavigate();

    const isEdit = mode === "edit";

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries());

        try {
            if (isEdit) {
                console.log("EDITED USER", data);
                const res = await api.put("/me", data);
                toast.success("Profile updated!");
                setUser(res.data.user);
                navigate("/");
            } else {
                console.log("REGISTER USER", data);
                const res = await api.post("/register", data);
                localStorage.setItem("token", res.data.token);
                setUser(res.data.user);
                toast.success("Account created!");
                navigate("/");
            }
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Something went wrong!"
            );
        }
    }

    if (userLoading) return <div>Loading...</div>;

    console.log(user);

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-6 sm:p-10 bg-white shadow-md rounded-xl"
        >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {isEdit ? "Edit Profile" : "Register"}
            </h2>

            {/* Username */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input
                    name="username"
                    defaultValue={isEdit ? user?.username : ""}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
            </div>

            {/* Email */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    defaultValue={isEdit ? user?.email : ""}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
            </div>

            {/* Password (only in register) */}
            {!isEdit && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>
            )}

            {/* Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    name="name"
                    defaultValue={isEdit ? user?.name : ""}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
            </div>

            {/* Role */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Role
                </label>
                <input
                    name="role"
                    defaultValue={isEdit ? user?.role : ""}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
            </div>

            {/* About */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                    About
                </label>
                <textarea
                    name="about"
                    rows="3"
                    defaultValue={isEdit ? user?.about || "" : ""}
                    placeholder="Write something about yourself..."
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
            </div>

            {/* Profile Image Url */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Image Url
                </label>
                <input
                    name="imageUrl"
                    defaultValue={isEdit ? user?.imageUrl : ""}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-indigo-500 transition"
            >
                {isEdit ? "Save Changes" : "Create Account"}
            </button>
        </form>
    );
}

export default ProfileForm;
