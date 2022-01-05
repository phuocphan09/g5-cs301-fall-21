import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SuccessIcon from '../../assets/success_icon.svg'
import AddPost from './AddPost';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';


const NewPostController = () => {

    return (
        <Container>
            <Icon src={SuccessIcon}/>
            <text> Post successfully submitted </text>
            <h2> Please wait,
                <br></br> redirecting to your feed... </h2>
        </Container>
    )
}

const Container = styled.div`
    margin-top:25vh;
    left:0%;
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text{
        margin-top:5.25vh;
        text-align: center;
        font-style: normal;
        font-weight: 700;
        font-size: 3.4vh;
        line-height: 4.3vh;
    }

    h2{
        margin-top:10vh;
        text-align: center;
        font-style: normal;
        font-weight: 300;
        font-size: 3.4vh;
        line-height: 4.3vh;
    }
`
const Icon = styled.img`
    min-width: 25.6vw;
    min-height: 14.39vh;
`

export default NewPostController
