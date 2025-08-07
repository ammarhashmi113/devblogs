import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import api from "./utils/axiosConfig";
import { UserContext } from "./contexts/userContext";

import Navbar from "./components/Navbar";

import BlogsPage from "./pages/BlogsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage/BlogDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProfileForm from "./pages/ProfileForm";

function App() {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

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

    return (
        <>
            <Toaster />
            <BrowserRouter>
                <UserContext.Provider value={{ user, setUser, userLoading }}>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<BlogsPage />} />
                        <Route
                            path="/blogs/:id"
                            element={<BlogDetailsPage />}
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/register"
                            element={<ProfileForm mode="register" />}
                        />
                        <Route
                            path="/profile/edit"
                            element={<ProfileForm mode="edit" />}
                        />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default App;
