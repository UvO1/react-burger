import { Navigate, Route } from 'react-router-dom';

export function ProtectedRouteElementAuth({ element }) {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken !== null ? element : <Navigate to="/login" replace />;
}

export function ProtectedRouteElementNoAuth({ element }) {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken === null ? element : <Navigate to="/" replace />;
}

export function ProtectedRouteElementResertPassword({ element }) {
    const refreshToken = localStorage.getItem("refreshToken");
    const resertPassword = localStorage.getItem("resertPassword");
    return refreshToken === null && resertPassword !== null ? element : <Navigate to="/" replace />;
}