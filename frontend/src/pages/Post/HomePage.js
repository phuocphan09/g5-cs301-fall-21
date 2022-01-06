import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import add_icon from '../../assets/add_icon.svg'
import active_home from '../../assets/home_blue.svg'
import inactive_personal from '../../assets/personal_grey.svg'

const HomePage = () => {

    const navigate = useNavigate()
    function handleAdd() {
        navigate('/AddPost')
    }

    function handleHome() {
        navigate('/HomePage')
    }

    function handlePersonal() {
        navigate('/PersonalPage')
    }

    return (
        <Container>

            <AddInterest onClick={handleAdd}>
                <RemoveIcon src={add_icon} />
                <text> Add new post </text>
            </AddInterest>

            <ColoredLine />

            <Navigation>
                <Home onClick={handleHome}> <RemoveIcon src={active_home} />
                    <text> Home </text>
                </Home>
                <Personal onClick={handlePersonal}> <RemoveIcon src={inactive_personal} />
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
`

const AddInterest = styled.button`
    margin-top: 3.3vh;
    margin-bottom:3.3vh;
    margin-right:16vw;
    margin-left:16vw;
    min-height:7.05vh;
    background: #ffffff;
    border-radius: 5px;
    transition: all 0.3s ease-in;
    display: flex;
    flex-direction: row;
    border: 1px solid #006dff;
    align-items:center;
    justify-content: center;
    text{
        margin-right: 2vw;
        margin-left: 2vw;
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: bold;
        font-size: 2.7vh;
        line-height: 21px;
        display: flex;
        align-text: center;
        color: #006DFF;
    }
`

const RemoveIcon = styled.img`
    width: 3vh;
    height: 3vh;
    justify-content:center;
`

const ColoredLine = styled.div`
    position: relative;
    max-width: 100vw;
    border: 1px solid #000000;
    background: #000000;
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
        color: #006DFF;
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
        color: #6B6B6B;
    }
`

export default HomePage