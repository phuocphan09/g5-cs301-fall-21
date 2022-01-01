import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Welcome from './Welcome';
import AuthService from '../../auth.service';

const InputEmail = (props) => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [buttonState, setButtonState] = useState(true);
    const [validState, setValidState] = useState("#006DFF");

    const initialValue ={
        valid: false,
        created:false
    }

    const [emailValidState, setEmailValidState] = useState(initialValue)

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value.length !== 0) {
            setButtonState(false)
        }
        if (e.target.value.length === 0) {
            setButtonState(true)
        }
    }

    const navigate = useNavigate(); 
    
    const handleFormSubmit = (e) =>{

        e.preventDefault();
        props.props(email)

        // localStorage.setItem("user", JSON.stringify(email.data));
        localStorage.setItem("user", email);
        console.log(localStorage.getItem("xxx"));
        // localStorage.removeItem("user");

        AuthService.ValidateEmail(email)
        .then (response => {
            const resultOutput = response.data;
            console.log(resultOutput)
            setEmailValidState(resultOutput)
            if (resultOutput.valid === true){
                if (resultOutput.created === true){
                    navigate("/InputPassword");
                } else {
                    navigate("/CreateAccount")
                }
            } else {
                setValidState("#FF5630")
            }})
            

    }
    return (
        <Container>
            <Welcome/>
            <Container1 inputColor={validState} >
                <view >
                    <text style={{ fontWeight: 700, fontSize: 18 }}>Fulbright Email</text>
                    <br></br>
                    <text style={{ fontWeight: 400, fontSize: 16 }}>Must have fulbright.edu.vn domain</text>

                </view>
            </Container1>
            <Container2 className='form-group form' autoComplete='off' onSubmit={handleFormSubmit}>

                <EmailBox inputColor={validState} type='text' required placeholder='Your Fulbright Email' className='form-control' onChange={handleEmailChange} value={email} />
                <br></br>
                <button disabled={buttonState}> Continue </button>

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
    color: ${props => props.inputColor };
}
text{
    text-align: left;
}
`;

const EmailBox = styled.input`
    position: absolute;
    left: 9.6%;
    top: 0%;
    width: 79.73%;
    height: 14.12%;
    background: #FFFFFF;
    border: 1px solid #006DFF;
    border-color: ${props => props.inputColor };
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
        pointer-events: none;
        transition: all 0.2s ease-in;
    }
`;

export default InputEmail
