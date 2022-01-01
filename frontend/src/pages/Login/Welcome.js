import React from 'react'
import styled from 'styled-components';

const Welcome = () => {
    return (
        <Container>
            <h1>Welcome to the Notifier</h1>
            <h2>Type in your Fulbright email to begin</h2>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    width: 75%;
    height: 8.54%;
    left: 10.4%;
    top: 11.1%;
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

export default Welcome
