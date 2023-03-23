import { Navigate} from 'react-router-dom';

export function ProtectedRouteElementAuth({ element }: any) {
    const refreshToken: string | null = localStorage.getItem("refreshToken");
    return ((refreshToken !== null) || (refreshToken !== '')) ? element : <Navigate to="/login" replace />;
}

export function ProtectedRouteElementNoAuth({element}: any) {
    const refreshToken: string | null = localStorage.getItem("refreshToken");
    return refreshToken === null ? element : <Navigate to="/" replace />;
}

export function ProtectedRouteElementResertPassword({ element }: any) {
    const refreshToken: string | null = localStorage.getItem("refreshToken");
    const resertPassword: string | null = localStorage.getItem("resertPassword");
    return refreshToken === null && resertPassword !== null ? element : <Navigate to="/" replace />;
}