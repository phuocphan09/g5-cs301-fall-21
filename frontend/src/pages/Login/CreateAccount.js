import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route } from 'react-router-dom'
import styled from 'styled-components';
import AuthService from '../../auth.service'


const CreateAccount = (props) => {

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [buttonState, setbuttonState] = useState(true);
    const [validState, setValidState] = useState({
        color: "#006DFF",
        subtitle: "Use this to authorize your next logins"
    });
    const initialValue = false
    const [passwordValidState,setPasswordValidState]= useState(initialValue)
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

        if (e.target.value.length !== 0) {
            setbuttonState(false)
        }
        if (e.target.value.length === 0) {
            setbuttonState(true)
        }
    }
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {

        e.preventDefault();
        props.passwordInput(password)

        if (password.length < 2) {
            setValidState({color: "#FF5630", subtitle: "Your password contains AT LEAST 2 characters"})
            return;
        }


        AuthService.CreateEmail(props.email, password)
        .then(response =>{
            const resultOutput = response.data.result;
            setPasswordValidState(resultOutput)
            if (resultOutput === true){
                navigate("/SuccessCreate")
            } else {
                setValidState({color: "#FF5630", subtitle: "Something wrong happened while creating your account"})
            }
        })

    }

    return (

        <Container>
            <WelcomeContainer>
                <h1>Welcome to the Notifier</h1>
                <h2>Create a password for your new account</h2>
            </WelcomeContainer>
            <Container1 inputColor={validState.color} >
                <view >
                    <text style={{ fontWeight: 700, fontSize: 18 }}>Create a password</text>
                    <br></br>
                    <text style={{ fontWeight: 400, fontSize: 16 }}>{validState.subtitle}</text>

                </view>
            </Container1>
            <Container2 className='form-group form' autoComplete='off' onSubmit={handleFormSubmit}>

                <PasswordBox inputColor={validState.color} type='password' required placeholder='Your Fulbright Password' className='form-control' onChange={handlePasswordChange} value={password} />
                <br></br>
                <button disabled={buttonState}> Authorize </button>

            </Container2>
        </Container>
    )
}

const Container = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Container1 = styled.div`
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 25.38%;
    left: 5.6%;
    width: 88.89%;
    height: 21.14%;
    background: #F2F6FF;
    border-radius: 5px;


view{
    position: absolute;
    left: 4.5%;
    right: 10.43%;
    top: 9.93%;
    bottom: 63.12%;
    line-height: 21px;
    font-family: 'Source Sans Pro';
    color: ${props => props.inputColor};
    text-align: left;
}
text{
    text-align: left;
}
`;
const PasswordBox = styled.input`
    position: absolute;
    left: 9.6%;
    top: 0%;
    width: 79.73%;
    height: 14.12%;
    background: #FFFFFF;
    border: 1px solid #006DFF;
    border-color: ${props => props.inputColor};
    box-sizing: border-box;
    border-radius: 5px;
    margin: 0.5rem 0;
    padding: 0 2rem;

    ::placeholder{
        position: absolute;
        left: 2rem;
        top: 29.5%;

        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 24px;
    }
    
`;

const Container2 = styled.form`
    position: absolute;
    top:35.23%;
    left:0%;
    width: 100%;
    height: 64.76%;
    display: flex;
    flex-direction: column;
    align-items:center;

    button:enabled{
        font-family: 'Source Sans Pro';
        color: #ffffff;
        position:absolute;
        width: 71.46%;
        height: 10.87%;
        top: 25.92%;
        left:14.4%;
        background: #006DFF;
        border-radius: 5px;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
        align-items: center;
        text-align:center;
        border:none;
        cursor: pointer;
        transition: all 0.2s ease-in;
    }
    button:disabled{
        font-family: 'Source Sans Pro';
        color: #ffffff;
        position:absolute;
        width: 71.46%;
        height: 10.87%;
        top: 25.92%;
        left:14.4%;
        background: #E7EAEC;
        border-radius: 5px;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
        align-items: center;
        text-align:center;
        border:none;
        cursor: pointer;
        transition: all 0.2s ease-in;
    }
`;

const WelcomeContainer = styled.div`
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


export default CreateAccount
