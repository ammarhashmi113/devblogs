// "use client";
import { useState } from "react";
import {
    Menu,
    X,
    Search,
    UserRound,
    BookOpenText,
    Home,
    Moon,
    Sun,
    LogIn,
    CircleUser,
} from "lucide-react";
import { useUser } from "../contexts/userContext";

const navLinks = [
    {
        name: "Home",
        href: "/",
        icon: <Home className="size-4 inline mr-1 mb-1" />,
    },
    {
        name: "Blogs",
        href: "/",
        icon: <BookOpenText className="size-4 inline mr-1" />,
    },
];

export default function BlogNavbar() {
    const { user, setUser, userLoading } = useUser();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    function toggleMobileOpen() {
        setMobileOpen((prev) => !prev);
    }

    function toggleUserDropdown() {
        setUserDropdownOpen((prev) => !prev);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
        setUserDropdownOpen(false);
    }

    function toggleDark() {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark", !darkMode);
    }

    return (
        <header className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100 shadow-sm sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        onClick={() => toggleMobileOpen()}
                        className="lg:hidden text-gray-600 dark:text-gray-300"
                    >
                        <Menu className="size-6" />
                    </button>

                    {/* Logo */}
                    <a
                        href="#"
                        className="text-xl font-semibold text-indigo-600 dark:text-indigo-400"
                    >
                        DevBlogs
                    </a>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                {link.icon}
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="hidden lg:flex items-center gap-4">
                        <button className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">
                            <Search className="size-5" />
                        </button>
                        {/* USER DROPDOWN */}
                        <div className="relative">
                            <button
                                onClick={toggleUserDropdown}
                                className="hover:text-indigo-600 dark:hover:text-indigo-400 mt-1 cursor-pointer"
                            >
                                <UserRound className="size-5" />
                            </button>

                            {userDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 shadow-md rounded-xl py-2 z-50">
                                    {user ? (
                                        <>
                                            <a
                                                href="/profile"
                                                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700"
                                            >
                                                <CircleUser className="inline size-4 mr-2" />
                                                Profile
                                            </a>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700"
                                            >
                                                <LogOut className="inline size-4 mr-2" />
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <a
                                                href="/login"
                                                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700"
                                            >
                                                <LogIn className="inline size-4 mr-2" />
                                                Sign in
                                            </a>
                                            <a
                                                href="/register"
                                                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700"
                                            >
                                                <CircleUser className="inline size-4 mr-2" />
                                                Create account
                                            </a>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={toggleDark}
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                        >
                            {darkMode ? (
                                <Sun className="size-5" />
                            ) : (
                                <Moon className="size-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="lg:hidden bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700">
                    <div className="p-4 flex justify-between items-center">
                        <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                            Menu
                        </span>
                    </div>
                    <div className="px-4 pb-4 space-y-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block text-base font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                {link.icon}
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-4 border-t border-gray-200 dark:border-zinc-700 space-y-2">
                            <a
                                href="#"
                                className="flex items-center gap-2 text-sm font-medium block"
                            >
                                <LogIn className="size-4" />
                                Sign in
                            </a>

                            <a
                                href="#"
                                className="flex items-center gap-2 text-sm font-medium block"
                            >
                                <CircleUser className="size-4" />
                                Create account
                            </a>

                            <button
                                onClick={toggleDark}
                                className="flex items-center gap-2 text-sm font-medium"
                            >
                                {darkMode ? (
                                    <Sun className="size-4" />
                                ) : (
                                    <Moon className="size-4" />
                                )}
                                Toggle {darkMode ? "Light" : "Dark"} Mode
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
