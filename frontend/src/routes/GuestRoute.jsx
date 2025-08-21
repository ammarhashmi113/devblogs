import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

function GuestRoute({ children }) {
    const { user, userLoading } = useUser();

    if (userLoading) return <div>Loading...</div>;

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default GuestRoute;
