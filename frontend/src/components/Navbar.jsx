// "use client";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
    LogOut,
    PencilLine,
} from "lucide-react";
import { useUser } from "../contexts/userContext";
import { useClickOutside } from "../hooks/useClickOutside";
import ConfirmationModal from "./ConfirmationModal";

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
    const navigate = useNavigate();
    const userDropdownRef = useRef(null);
    const mobileDropdownRef = useRef(null);
    const toggleBtnRef = useRef(null);

    const { user, setUser, userLoading } = useUser();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    function toggleMobileOpen() {
        setMobileOpen((prev) => !prev);
    }

    function toggleUserDropdown() {
        setUserDropdownOpen((prev) => !prev);
    }

    function handleLogoutConfirm() {
        localStorage.removeItem("token");
        setUser(null);
        setUserDropdownOpen(false);
        setShowLogoutModal(false);
        toast.success("Logged out successfully");
        navigate("/");
    }

    function handleLogoutCancel() {
        setShowLogoutModal(false);
    }

    function toggleDark() {
        const newMode = !darkMode;
        setDarkMode(newMode);

        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const isDark = savedTheme === "dark";

        setDarkMode(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    // Close the dropdown when a click is detected outside it
    useClickOutside(userDropdownRef, () => setUserDropdownOpen(false));

    // Close the mobile menu when a touchstart is detected outside it
    useClickOutside(
        mobileDropdownRef,
        () => setMobileOpen(false),
        toggleBtnRef
    ); // Ignore toggle button clicks to avoid this bug: Click on toggle → dropdown closes (outside click), then reopens due to toggle logic

    return (
        <>
            <header className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100 shadow-sm sticky top-0 z-50 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            onClick={toggleMobileOpen}
                            className="lg:hidden text-gray-600 dark:text-gray-300"
                            ref={toggleBtnRef}
                        >
                            <Menu className="size-6" />
                        </button>

                        {/* Logo */}
                        <a
                            href="/"
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
                                    className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-15"
                                >
                                    {link.icon}
                                    {link.name}
                                </a>
                            ))}
                            {user ? (
                                <a
                                    href="/blogs/new"
                                    className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-15"
                                >
                                    <PencilLine className="size-4 inline mr-1 mb-1" />
                                    New
                                </a>
                            ) : (
                                <div className="w-15"></div>
                            )}
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
                                    <div
                                        ref={userDropdownRef}
                                        className="absolute right-0 mt-2 w-45 bg-white dark:bg-zinc-800 shadow-md rounded-xl p-2 z-50 transition-colors duration-300"
                                    >
                                        {!userLoading && user ? (
                                            <>
                                                <a
                                                    href="/profile"
                                                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-xl"
                                                >
                                                    <CircleUser className="inline size-4 mr-2" />
                                                    Profile
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        setShowLogoutModal(true)
                                                    }
                                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer rounded-xl"
                                                >
                                                    <LogOut className="inline size-4 mr-2" />
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <a
                                                    href="/login"
                                                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-xl"
                                                >
                                                    <LogIn className="inline size-4 mr-2" />
                                                    Sign in
                                                </a>
                                                <a
                                                    href="/register"
                                                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-xl"
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
                    <div
                        ref={mobileDropdownRef}
                        className="lg:hidden bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 transition-colors duration-300"
                    >
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
                                    className="block text-base font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                    {link.icon}
                                    {link.name}
                                </a>
                            ))}

                            <div className="pt-4 border-t border-gray-200 dark:border-zinc-700 space-y-2">
                                <a
                                    href="/login"
                                    className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                    <LogIn className="size-4" />
                                    Sign in
                                </a>

                                <a
                                    href="/register"
                                    className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                    <CircleUser className="size-4" />
                                    Create account
                                </a>

                                <button
                                    onClick={toggleDark}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
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
            <ConfirmationModal
                show={showLogoutModal}
                message="Are you sure you want to log out?"
                onCancel={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
            />
        </>
    );
}
