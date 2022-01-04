import { React, useEffect } from 'react'
import { ReactComponent as SuccessIcon } from '../../assets/success_icon.svg'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const SuccessLogout = () => {
    const navigate = useNavigate()
    useEffect (() => {
        setTimeout (() => {
            navigate('/InputEmail')
        }, 1000)
    })


    return (
        <Container>
            <SuccessIcon className='SuccessIcon' />
            <h1> Log out successfully </h1>
            <h2> Please wait, redirecting to login page... </h2>
            {/* <Navigate to="/ActiveInterest" /> */}
        </Container>
    )
}

const Container = styled.div`
    position:absolute;
    top:25%;
    left:0%;
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-contetnt: center;
    align-items: center;

    h1{
        font-family: 'Source Sans Pro';
        text-align: center;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 10px;
    }

    h2{
        font-family: 'Source Sans Pro';
        text-align: center;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 23,87px;
    }
`;

export default SuccessLogout
