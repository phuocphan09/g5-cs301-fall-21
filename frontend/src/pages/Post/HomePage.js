import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import add_icon from '../../assets/add_icon.svg'
import active_home from '../../assets/home_blue.svg'
import inactive_personal from '../../assets/personal_grey.svg'
import axios from 'axios';


const HomePage = () => {

    const navigate = useNavigate()
    // const userEmail = localStorage.getItem('user')
    const userEmail = "hoang@student.fulbright.edu.vn"
    const timestamp = useState('')
    
    const [postList, setPostList] = useState([])

    //test long description
    const testDrive = {title: "nucati", description:"booboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboobooboo",
    poster:"hulu",interestList:["art"]}

    useEffect(() => {
        axios.get('http://localhost:8080/v1/getdisplaypost?email=' + userEmail)
            .then(response => {
            let toAdd = response.data.content

            //to be deleted
            toAdd.push(testDrive)

            toAdd.map((item)=>{
                if (item.description.length>200){
                    item.readMore = false;
                }
            })
            setPostList(toAdd)
            })
    }, [])    

    function handleAdd() {
        navigate('/AddPost')
    }

    function handleHome() {
        navigate('/HomePage')
    }

    function handlePersonal() {
        navigate('/PersonalPage')
    }

    function handleSeeMore(index){
        let cloneState = [...postList]
        cloneState[index].readMore = true
        setPostList(cloneState)
    }

    function showPost(item,index){
        if (item.readMore === false){
            return <PostBox>
                        <TextWrapper>
                            <h1> {item.title} </h1>
                            <line />
                            <h2> {item.description.substring(0,200)} <SeeMoreButton onClick={()=>{handleSeeMore(index)}}> See More </SeeMoreButton> </h2>
                            <line />
                            <h2> Posted by: {item.poster} </h2>
                        </TextWrapper>

                        <InterestWrapper>
                            {item.interestList.map((item1) => (
                                <InterestLabel>
                                    <h2> {item1} </h2>
                                </InterestLabel>
                            ))}
                        </InterestWrapper>
                    </PostBox>
        } else{
            return <PostBox>
                        <TextWrapper>
                            <h1> {item.title} </h1>
                            <line />
                            <h2> {item.description} </h2>
                            <line />
                            <h2> Posted by: {item.poster} </h2>
                        </TextWrapper>

                        <InterestWrapper>
                            {item.interestList.map((item1) => (
                                <InterestLabel>
                                    <h2> {item1} </h2>
                                </InterestLabel>
                            ))}
                        </InterestWrapper>
                    </PostBox>
        }
    }

    return (
        <Container>

            <AddInterest onClick={handleAdd}>
                <RemoveIcon src={add_icon} />
                <text> Add new post </text>
            </AddInterest>

            <ColoredLine />

            {postList.map((item,index) => (
                showPost(item,index)
            ))}
            
            <Block7>

            </Block7>
            
            <Navigation>
                <Home onClick={handleHome}> <RemoveIcon1 src={active_home} />
                    <text> Home </text>
                </Home>
                <Personal onClick={handlePersonal}> <RemoveIcon1 src={inactive_personal} />
                    <text> Personal </text>
                </Personal>
            </Navigation>

        </Container>
    )
}
const Container2 = styled.div`
    top: 20.24%;
    left:0%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex:1;
    gap:3.3vh;
    transition: all 0.3s ease-out;
`
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
        /* align-text: center; */
        color: #006DFF;
    }
`
const SeeMoreButton = styled.button`
    background-color: #ffffff;
    border:none;
    color:#006DFF;
`

const RemoveIcon = styled.img`
    width: 3vh;
    height: 3vh;
    justify-content:center;
`
const RemoveIcon1 = styled.img`
    width: 2.5vh;
    height: 2.5vh;
    justify-content:center;
`

const ColoredLine = styled.div`
    position: relative;
    max-width: 100vw;
    margin-bottom: 3.3vh;
    border: 1px solid #000000;
    background: #000000;
`

const InterestWrapper = styled.div`
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content: left;
    align-items: left;
    inline-size: 90vw;
    width: 90vw;
    margin-right:1vw;
    margin-left: 3vw;
    margin-bottom: 5vw;
`

const InterestLabel = styled.div`
    background-color: #FFFFFF;
    box-sizing: border-box;
    border-radius: 2px;
    border: solid 1px #6B6B6B;
    align-items: center;
    justify-content: center;
    margin-right: 0.2rem;
    margin-bottom: 0.2rem;
    overflow-wrap: break-word;


    h2 {
        font-family: 'Source Sans Pro';
        color: #000000;
        font-style: normal;
        font-weight: normal;
        font-size: 2vh;
        text-align: left;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        overflow-wrap: break-word;
    }
`

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    inline-size: 90vw;
    width:90vw;
    overflow-wrap: break-word;
    margin-right: 1vw;
    margin-left: 1vw;

    h1 {
        font-family: 'Source Sans Pro';
        color: #000000;
        font-style: normal;
        font-weight: bold;
        font-size: 3vh;
        text-align: left;
        margin-left: 1rem;
        margin-right: 1rem;
        overflow-wrap: break-word;
    }

    h2 {
        font-family: 'Source Sans Pro';
        color: #000000;
        font-style: normal;
        font-weight: normal;
        font-size: 2vh;
        text-align: left;
        margin-left: 1rem;
        margin-right: 1.8rem;
        overflow-wrap: break-word;
    }
    
    line {
        position: relative;
        margin-top: 2vh;
        margin-left: 2vw;
        margin-right: 5vw;
        border: 0.5px solid #000000;
        background: #000000;
    }
`

const PostBox = styled.div`
    background-color: #FFFFFF;
    box-sizing: border-box;
    border-radius: 5px;
    border: solid 1px #006DFF;
    margin-bottom: 3.3vh;
    margin-left: 5vw;
    margin-right: 5vw;
    inline-size: 90vw;
    width: 90vw;
    overflow-wrap: break-word;

`;

const Navigation = styled.div`
    position:fixed;
    display: flex;
    flex-direction: row;    
    width: 100vw;
    min-height: 7.35vh;
    left: 0;
    top:92.65vh;
    right:0;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.15);
    background: #ffffff;
`

const Block7 = styled.div`
min-height:7.35vh;
min-width:100vw;
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
