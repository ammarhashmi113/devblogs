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
                const res = await api.put("/me", data);
                toast.success("Profile updated!");
                setUser(res.data.user);
                navigate("/");
            } else {
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

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Devblogs"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                    {isEdit ? "Edit Profile" : "Create your account"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                            Username
                        </label>
                        <input
                            name="username"
                            defaultValue={isEdit ? user?.username : ""}
                            placeholder="cool_dev123"
                            required
                            className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                            Email address
                        </label>
                        <input
                            name="email"
                            type="email"
                            defaultValue={isEdit ? user?.email : ""}
                            placeholder="someone@example.com"
                            required
                            className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>

                    {/* Password (only for register) */}
                    {!isEdit && (
                        <div>
                            <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    )}

                    {/* Name */}
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                            Name
                        </label>
                        <input
                            name="name"
                            defaultValue={isEdit ? user?.name : ""}
                            placeholder="John Doe"
                            className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                            Role
                        </label>
                        <input
                            name="role"
                            defaultValue={isEdit ? user?.role : ""}
                            placeholder="Developer"
                            className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>

                    {/* About */}
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                            About
                        </label>
                        <textarea
                            name="about"
                            rows="3"
                            defaultValue={isEdit ? user?.about || "" : ""}
                            placeholder="Write something about yourself..."
                            className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                            Profile Image Url
                        </label>
                        <input
                            name="imageUrl"
                            defaultValue={isEdit ? user?.imageUrl : ""}
                            placeholder="https://example.com/avatar.png"
                            className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                        >
                            {isEdit ? "Save Changes" : "Create Account"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileForm;
