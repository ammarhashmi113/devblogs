import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

function ProtectedRoute({ children }) {
    const { user, userLoading } = useUser();

    if (userLoading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
