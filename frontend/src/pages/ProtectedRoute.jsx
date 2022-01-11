import React, {useEffect, useState} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import axios from "axios";


const ProtectedRoute = (props) => {

    const location = useLocation();
    const [state, setState] = useState({isAuth: false, isLoaded: false});

    useEffect(() => {
        axios.get('/v1/authenticatetoken')
            .then(response => {
                setState({isAuth: response.status !== 401, isLoaded: true});
            })
    }, [])



    return <div>
        {
        state.isLoaded ?

            state.isAuth ?
                    (location.pathname === '/') ?
                    <Navigate to="/HomePage" />
                    : <Outlet />
            : <Navigate to="/login/InputEmail" />

        : <div></div> // loading

        }
    </div>
}

export default ProtectedRoute