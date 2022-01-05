import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as SuccessIcon } from '../../assets/success_icon.svg'
import styled from 'styled-components'


const SuccessAuth = () => {
    const navigate = useNavigate()
    useEffect (() => {
        setTimeout (() => {
            navigate('/HomePage')
        }, 500)
    })

    return (
        <Container>
            <SuccessIcon className='SuccessIcon' />
            <h1> Successfully authorized </h1>
            <h2> Please wait, redirecting to your feed... </h2>
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

export default SuccessAuth
