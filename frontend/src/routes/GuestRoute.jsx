import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

import LoadingSpinner from "../components/LoadingSpinner";

function GuestRoute({ children }) {
    const { user, userLoading } = useUser();

    if (userLoading) return <LoadingSpinner label="Loading" />;

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default GuestRoute;
