import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import inactive_home from '../../assets/home_grey.svg'
import active_personal from '../../assets/personal_blue.svg'
import avatar from '../../assets/avatar.svg'
import arrow from '../../assets/arrow.svg'
import axios from "axios";


const PersonalPage = () => {

    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    useEffect(() => {
        axios.get('/v1/authenticatetoken')

            .then(response => {

                const email = response.data;
                let name = email.split("@")[0];

                setFirstName(name.split(".")[0]);
                setLastName(name.split(".")[1]);
                setUserEmail(email);

            })
    }, [])

    function handleAdd() {
        navigate('/AddInterest')
    }

    function handleLogout() {
        axios.get('/v1/logout')
            .then(response => {
                navigate('/SuccessLogout')
            })
    }

    function handleHome() {
        navigate('/HomePage')
    }

    function handlePersonal() {
        navigate('/PersonalPage')
    }

    return (
        <div> {(userEmail.length === 0) ? (<div></div>) :
            (<Container>
                <AvatarWrapper>
                    <Avatar src={avatar}/>
                    <TextWrapper>
                        <h1> {firstname} {lastname} </h1>
                        <h2> {userEmail} </h2>
                    </TextWrapper>
                </AvatarWrapper>

                <line/>

                <ArrowButton onClick={handleAdd}>
                    <TextWrapper>
                        <h1>Configure your interest </h1>
                        <h2> Choose which type of posts you want to be notified about </h2>
                    </TextWrapper>
                    <RemoveIcon src={arrow}/>
                </ArrowButton>

                <line/>

                <ArrowButton onClick={handleLogout}>
                    <TextWrapper>
                        <h1> Logout </h1>
                    </TextWrapper>
                    <RemoveIcon src={arrow}/>
                </ArrowButton>

                <line/>

                <Navigation>
                    <Home onClick={handleHome}> <RemoveIcon src={inactive_home}/>
                        <text> Home</text>
                    </Home>
                    <Personal onClick={handlePersonal}> <RemoveIcon src={active_personal}/>
                        <text> Personal</text>
                    </Personal>
                </Navigation>

            </Container>
            )} </div>
    )
}

const Container = styled.div`
    top:0;
    left:0;
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction: column;

    line {
        max-width: 100vw;
        margin-top: 2vh;
        border: 0.5px solid #000000;
        background: #000000;
    }
`

const Avatar = styled.img`
    width: 13vw;
    height: 13vw;
    margin-left: 0.5rem;
    align-items: left;
    justify-content: left;
`

const RemoveIcon = styled.img`
    width: 3vh;
    height: 3vh;
    justify-content:center;
`
const AvatarWrapper = styled.div`
    width:100vw;
    margin-top:0.5rem;
    display:flex;
    flex-direction: row;
    flex-wrap:wrap;
    justify-content: center;
    align-items: center;
`

const ArrowButton = styled.button`
    width: 100vw;
    display:flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 0px solid #ffffff;
`

const TextWrapper = styled.div`
    width:76.27vw;
    display:flex;
    flex-wrap:wrap;
    flex-direction: column;
    justify-content: center;
    align-items:left;
    margin-right: 1rem;
    margin-left:1rem;

    h1 {
        width:76.27vw;
        font-family: 'Source Sans Pro';
        color: #000000;
        font-style: normal;
        font-weight: bold;
        font-size: 3vh;
        text-align: left;
        margin-bottom: 0rem;
        flex-wrap:wrap;

    }

    h2 {
        width:76.27vw;
        font-family: 'Source Sans Pro';
        color: #000000;
        font-style: normal;
        font-weight: normal;
        font-size: 2vh;
        text-align: left;

    }
`

const Navigation = styled.div`
    display: flex;
    flex-direction: row;    
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 7.35vh;
    left: 0;
    right:0;
    top: 92.65vh;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.15);
    background: #ffffff;
`

const Home = styled.button`
    width:50vw;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 0px solid #ffffff;

    text {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 16px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #6B6B6B;
    }
`

const Personal = styled.button`
    width: 50vw;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 0px solid #ffffff;

    text {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 16px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #006DFF;
    }
`

export default PersonalPage
