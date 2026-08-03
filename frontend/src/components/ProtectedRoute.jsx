import React from "react";
import { useAuth } from "../AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
    const { isAuthorized, authLoading } = useAuth();

    if (authLoading || isAuthorized === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    return isAuthorized ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;