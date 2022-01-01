import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
    if (localStorage.getItem("user")) {
        return true;    
    }
    return false;
}

const ProtectedRoute = (props) => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/InputEmail" />
}

export default ProtectedRoute