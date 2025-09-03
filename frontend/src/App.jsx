import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import api from "./utils/axiosConfig";
import { UserContext } from "./contexts/userContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

import Navbar from "./components/Navbar";

import BlogsPage from "./pages/BlogsPage/BlogsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage/BlogDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProfileForm from "./pages/RegisterAndProfileEdit";
import ProfilePage from "./pages/ProfilePage";
import PublicProfilePage from "./pages/PublicProfilePage";
import CreateBlogPage from "./pages/CreateBlogPage";
import EditBlogPage from "./pages/EditBlogPage";

function App() {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    async function fetchCurrentUser() {
        try {
            const res = await api.get("/me"); // for getting user info
            setUser(res.data.user);
        } catch (err) {
            localStorage.removeItem("token"); // maybe it failed bcz token expired, so removing the token
            setUser(null); // logging the user out
        } finally {
            setUserLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchCurrentUser(); // fetching current user if token exists
        } else {
            setUserLoading(false);
        }
    }, []); // this useEffect runs only when the app starts

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const isDark = savedTheme === "dark";
        setDarkMode(isDark);
        console.log("darkMode");
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    return (
        <>
            <Toaster
                toastOptions={{
                    className: "rounded-lg shadow-lg",
                    style: {
                        background: darkMode ? "#1f2937" : "#fff",
                        color: darkMode ? "#fff" : "#000",
                    },
                }}
            />
            <BrowserRouter>
                <UserContext.Provider value={{ user, setUser, userLoading }}>
                    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Routes>
                        {/* open routes */}
                        <Route path="/" element={<BlogsPage />} />
                        <Route
                            path="/blogs/:id"
                            element={<BlogDetailsPage />}
                        />
                        {/* protected routes */}
                        <Route
                            path="/blogs/:id/edit"
                            element={
                                <ProtectedRoute>
                                    <EditBlogPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile/edit"
                            element={
                                <ProtectedRoute>
                                    <ProfileForm mode="edit" />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/users/:username"
                            element={<PublicProfilePage />}
                        />
                        <Route
                            path="/blogs/new"
                            element={
                                <ProtectedRoute>
                                    <CreateBlogPage />
                                </ProtectedRoute>
                            }
                        />
                        {/* guest-only routes */}
                        <Route
                            path="/login"
                            element={
                                <GuestRoute>
                                    <LoginPage />
                                </GuestRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <GuestRoute>
                                    <ProfileForm mode="register" />
                                </GuestRoute>
                            }
                        />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default App;
