import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const useAuth = () => {
    if (localStorage.getItem("user")) {
        return true;    
    }
    return false;
}

const ProtectedRoute = (props) => {
    const isAuth = useAuth();
    const location = useLocation();
    return isAuth ? (location.pathname === '/') ? <Navigate to="/Homepage" /> : <Outlet /> : <Navigate to="/InputEmail" />
}

export default ProtectedRoute