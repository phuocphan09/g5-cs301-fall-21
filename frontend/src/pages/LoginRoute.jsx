import React, {useEffect, useState} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import axios from "axios";


const LoginRoute = (props) => {

    const location = useLocation();
    const [state, setState] = useState({isAuth: false, isLoaded: false});

    useEffect(() => {
        console.log("hello222");
        axios.get('/v1/authenticatetoken')
            .then(response => {
                console.log(response.status);
                setState({isAuth: response.status !== 401, isLoaded: true});
            })
    }, [])



    return <div>
        {
            state.isLoaded ?
                state.isAuth ?
                    <Navigate to="/ActiveInterest" />
                    : (location.pathname === '/login/InputEmail') ?
                        <Outlet />
                    : <Navigate to="/login/InputEmail" />
                : <div></div> // loading

        }
    </div>
}

export default LoginRoute;