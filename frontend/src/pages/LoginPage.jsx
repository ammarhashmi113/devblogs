import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${apiUrl}/login`, {
                email,
                password,
            });
            // localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (err) {
            setError(err.response.data.error);
            console.error("Login failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="email"
                value={email}
                placeholder="email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <input
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button type="submit" disabled={loading}>
                Submit
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
}

export default LoginPage;
