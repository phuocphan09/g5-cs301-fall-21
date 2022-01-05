import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import inactive_home from '../../assets/home_grey.svg'
import active_personal from '../../assets/personal_blue.svg'
import avatar from '../../assets/avatar.svg'
import arrow from '../../assets/arrow.svg'


const PersonalPage = () => {

    const navigate = useNavigate()
    const userEmail = localStorage.getItem("user")
    var name = userEmail.split("@")[0];
    var firstname = name.split(".")[0];
    var lastname = name.split(".")[1];

    function handleAdd() {
        navigate('/AddInterest')
    }

    function handleLogout() {
        navigate('/SuccessLogout')
    }

    function handleHome() {
        navigate('/HomePage')
    }

    function handlePersonal() {
        navigate('/PersonalPage')
    }

    return (
        <Container>

                <AvatarWrapper>
                    <Avatar src={avatar} />
                    <TextWrapper>
                        <h1> {firstname} {lastname} </h1>
                        <h2> {userEmail} </h2>
                    </TextWrapper>
                </AvatarWrapper>

                <line />

                <ArrowButton onClick={handleAdd}>
                    <TextWrapper>
                        <h1>Configure your interest </h1>
                        <h2> Choose which type of posts you want to be notified about </h2>
                    </TextWrapper>
                    <RemoveIcon src={arrow} />
                </ArrowButton>

                <line />

                <ArrowButton onClick={handleLogout}>
                    <TextWrapper>
                        <h1> Logout </h1>
                    </TextWrapper>
                    <RemoveIcon src={arrow} />
                </ArrowButton>

                <line />

            <Navigation>
                <Home onClick={handleHome}> <RemoveIcon src={inactive_home} />
                    <text> Home </text>
                </Home>
                <Personal onClick={handlePersonal}> <RemoveIcon src={active_personal} />
                    <text> Personal </text>
                </Personal>
            </Navigation>

        </Container>
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
        position: relative;
        width: 100vw;
        margin-top: 2vh;
        border: 0.5px solid #000000;
        background: #000000;
        
    }
`

const Avatar = styled.img`
    position: relative;
    width: 13.33vw;
    height: 13.33vw;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    margin-top: 1rem;
    align-items: left;
    justify-content: left;
`

const RemoveIcon = styled.img`
    ${'' /* position: relative; */}
    width: 3vh;
    height: 3vh;
    margin-right:5px;
    margin-left: 5px;
    margin-top: 5px;
`
const AvatarWrapper = styled.div`
    width:100vw;
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
    width:76.26vw;
    display:flex;
    flex-wrap:wrap;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    margin-right: 1rem;

    h1 {
        font-family: 'Source Sans Pro';
        color: #000000;
        font-style: normal;
        font-weight: bold;
        font-size: 3vh;
        text-align: left;
        margin-left: 1rem;
        margin-bottom: 0rem;
        flex-wrap:wrap;

    }

    h2 {
        font-family: 'Source Sans Pro';
        color: #000000;
        font-style: normal;
        font-weight: normal;
        font-size: 2vh;
        text-align: left;
        margin-left: 1rem;

    }
    
    line {
        position: relative;
        width: 100vw;
        margin-top: 2vh;
        border: 0.5px solid #000000;
        background: #000000;
        
    }
`

const Navigation = styled.div`
    display: flex;
    flex-direction: row;    
    position: absolute;
    justify-content: center;
    align-items: center;
    wdith: 100vw;
    height: 7.35vh;
    left: 0vw;
    top: 92.65vh;
    box-shadow: 0px 0px 8px 1px;
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
