import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components';
import newTag from '../../assets/new_tag.svg'
import searchIcon from '../../assets/search_icon.svg'
import added_icon from '../../assets/added_icon.svg'
import remove_icon from '../../assets/remove_icon.svg'
import GetActive from '../../get.addable'
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import SearchBarPage from './SearchBar1'
import axios from 'axios';

const AddPost = () => {
    const pickStateR = { color: '#15B34E', width: '27vw' }
    const pickStateNR = { color: '#FF0000', width: '25vw' }
    const [pageValidState, setPageValidState] = useState({ colorTitle: '#006DFF', colorDescription: '#6B6B6B', title: 'Title', description: 'Description - Text and links (required)' })

    const [pageTitle, setPageTitle] = useState('')
    const [topicDescription, setTopicDescription] = useState('')
    const [interestPicked, setInterestPicked] = useState([])

    const [dropIndex, setDropIndex] = useState(-1)
    const [pageState, setPageState] = useState(true)

    let intialInterestSet = []
    useEffect(() => {
        axios.get('http://localhost:8080/v1/getallinterest')
            .then(response => {
                console.log(response)
                response.data.activeInterestList.map((item) => {
                    intialInterestSet.push({ interestName: item.interestName, interestState: pickStateNR })
                })
            })
    }, [])

    const [interestToPick, setInterestToPick] = useState(intialInterestSet)

    //call api inside, modify search in keyword list only this

    useEffect(() => {
        console.log(pageTitle)
    }, [pageTitle])

    useEffect(() => {
        console.log(topicDescription)
    }, [topicDescription])


    const changeToPick = (e) => {
        setInterestToPick([...e])
    }

    const changePicked = (e) => {
        setInterestPicked([...e])
    }

    const changePage = (e) => {
        setPageState(e)
    }

    function handleClickSearch() {
        setPageState(false)
    }

    function updateTitle(props) {
        setPageTitle(props.target.value)
    }

    function updateDescription(props) {
        setTopicDescription(props.target.value)
    }

    const showButton = (props) => {
        if (props.color === "#15B34E") {
            return <button>
                <view >
                    <RemoveIcon src={added_icon}></RemoveIcon>
                    Removed
                </view>
            </button>
        } else {
            return (
                <button onClick={() => handleRemove(props.number)}>
                    <view>
                        <RemoveIcon src={remove_icon}></RemoveIcon>
                        Remove
                    </view>
                </button>
            )
        }
    }

    function handleRemove(props) {

        let newInterestItem = interestPicked[props]
        newInterestItem.interestState = pickStateR

        let cloneInterest = interestPicked
        cloneInterest[props] = newInterestItem


        setDropIndex(props)

        let newAddbackInterestItem = { ...newInterestItem };
        newAddbackInterestItem.interestState = pickStateNR
        let addbackInterestClone = [...interestToPick]
        addbackInterestClone.push(newAddbackInterestItem)

        setInterestToPick([...addbackInterestClone])
    }

    useEffect(() => {
        if (dropIndex >= 0) {
            setTimeout(() => {
                let cloneInterest = interestPicked
                cloneInterest.splice(dropIndex, 1)
                setInterestPicked(cloneInterest)
                setDropIndex(-1)
            }, 500)
        }

    }, [dropIndex])



    function searchFunctionSuggestMe(props) {

        let searchString = props.title + props.description;
        searchString = searchString.toLocaleLowerCase()

        let cloneInterestPicked = [...interestPicked];
        let cloneInterestToPick = [...interestToPick]
        interestToPick.map((item, index) => {
            if (searchString.includes(item.interestName.toLocaleLowerCase())) {
                cloneInterestPicked.push(item)
                cloneInterestToPick.splice(cloneInterestToPick.indexOf(item), 1)
                console.log(cloneInterestToPick)
            }
        })


        setInterestPicked([...cloneInterestPicked])
        setInterestToPick([...cloneInterestToPick])

    }

    function updateValidState() {
        if (pageValidState.colorTitle === '#FF0000') {
            setPageValidState({ colorTitle: '#006DFF', colorDescription: '#6B6B6B', title: 'Title', description: 'Description - texts and links (required)' })
        }
    }

    const navigate = useNavigate();

    function handleSubmitTopic() {
        if (pageTitle.length === 0 || topicDescription.length === 0) { setPageValidState({ colorTitle: '#FF0000', colorDescription: '#FF0000', title: 'A title is required', description: 'A description is reqired' }) }
        else {
            let bodyTextInterest = []
            interestPicked.map(item => bodyTextInterest.push(item.interestName))
            const userEmail = localStorage.getItem("user");
            const bodyText = { poster: userEmail, title: pageTitle, description: topicDescription, interestList: bodyTextInterest }
            console.log(bodyText)
            axios.post("http://localhost:8080/v1/submitpost", bodyText)
                .then(response => console.log(response.data.added))
            navigate("/ResultAddPost")
        }
    }

    if (pageState) {
        console.log(pageTitle)
        return (
            <Container>
                <Header1>Add a new post</Header1>

                <Header2 placeholder={pageValidState.title} onChange={(e) => (updateTitle(e), updateValidState())} inputColor={pageValidState.colorTitle} value={pageTitle}></Header2>

                <Header3 inputColor={pageValidState.colorDescription} >
                    <textarea placeholder={pageValidState.description} onChange={(e) => (updateDescription(e), updateValidState())} value={topicDescription}></textarea>
                </Header3>

                <Header4>
                    <PairNewTag>
                        <text>Topic</text>
                        <NewTag src={newTag} />
                    </PairNewTag>
                    <TextSupport>
                        Students indicating interests in the selected topics will be notified
                    </TextSupport>
                </Header4>

                <Header5>
                    <SuggestMe onClick={() => searchFunctionSuggestMe({ title: pageTitle, description: topicDescription })}>Suggest Me!</SuggestMe>
                    <SearchBarContainer onClick={() => handleClickSearch()}>
                        <SearchIcon src={searchIcon} />
                        <SearchBar > Search for Topics
                        </SearchBar>
                    </SearchBarContainer >
                </Header5>

                <Header6>
                    {interestPicked.length !== 0 ? interestPicked.map((item, index) => (
                        <InterestContainer buttonColor={item.interestState.color} buttonWidth={item.interestState.width}>
                            <text> {item.interestName} </text>
                            {showButton({ color: item.interestState.color, number: index })}
                        </InterestContainer>
                    )) : <DashedBox><h4> Uh oh... you haven’t added any interests <br /> Select the above blue button to add one! </h4></DashedBox>}
                </Header6>

                <Block7>

                </Block7>

                <Header7>
                    <SubmitButton onClick={() => handleSubmitTopic()}>
                        <text>Submit</text>
                    </SubmitButton>
                </Header7>
            </Container>

        )
    } else {
        return <SearchBarPage pageStatefunc={changePage} toPick={{ toPickList: interestToPick, function1: changeToPick }} picked={{ pickedList: interestPicked, function2: changePicked }}></SearchBarPage>
    }
}

const Block7 = styled.div`
min-height:13.79vh;
min-width:100vw;
`

const Header7 = styled.div`
position:fixed;
background: #ffffff;
width:100%;
height:13.79vh;
align-items: center;
bottom:0;
`

const SubmitButton = styled.button`
    margin-top:3.3vh;
    margin-left:14.4vw;
    bottom:3.3vh;
    width: 71.7vw;
    height:7.04vh;
    background: #006DFF;
    border-radius: 5px;
    transition: all 0.3s ease-out;
    display:flex;
    align-items:center;
    justify-content: center;
    border: 1px solid #006dff;


    text{
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: bold;
        font-size: 2.7vh;
        line-height: 21px;
        display: flex;
        align-items: center;
        color: #FFFFFF;
    }
`
const RemoveIcon = styled.img`
    width: 3vh;
    height: 3vh;
    margin-right: 5px;
    justify-content:center;
`
const Header6 = styled.div`
    margin-top: 2.1vh;
    left:0%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex:1;
    gap:3.3vh;
    transition: all 0.3s ease-out;
`
const InterestContainer = styled.div`
    position: relative;
    top:0%;
    width: 88.8vw;
    height: 7.8vh;
    margin-left: 5.87%;
    padding:20;
    border: 1px solid #6B6B6B;
    box-sizing: border-box;
    border-radius: 10px;

    text {
        position: absolute;
        margin-left: 5.6vw;
        margin-top: 2.4vh;
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: normal;
        font-size: 2.7vh;
        line-height: 21px;
        display: flex;
        align-items: center;
        font-weight: 500;
        width:60vw;
    }

    button {
        align-items:center;
        justify-content:center;
        position: absolute;
        display: flex;
        right: 4.5%;
        top:19.23%;
        height: 61.54%;
        background: #FFFFFF;
        border: 1px solid #FF0000;
        box-sizing: border-box;
        border-radius: 15px;
        border-color: ${props => props.buttonColor};
        width:  ${props => props.buttonWidth};
    }

    view {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: bold;
        font-size:1.8vh;
        line-height: 2.1vh;
        display: flex;
        flex-direction:row;
        align-items: center;
        color: ${props => props.buttonColor};
    }
`
const DashedBox = styled.div`
    background-color: #FFFFFF;
    box-sizing: border-box;
    border-radius: 5px;
    align-items: center;
    border: dashed 1px #6B6B6B;
    margin-left: 5.3vw;
    margin-right: 5.3vw;
    justify-content:center;

    h4 {
        font-family: 'Source Sans Pro';
        width: 100%;
        height: 100%;
        color: #6B6B6B;
        font-style: normal;
        font-weight: normal;
        font-size: 2.25vh;
        text-align: center;
    }
`
const BackContainer = styled.button`
    margin-top:3.3vh;
    margin-bottom:3.3vh;
    margin-right:16vw;
    margin-left:16vw;
    min-height:7.05vh;
    background: #006DFF;
    border-radius: 5px;
    transition: all 0.3s ease-out;
    display:flex;
    align-items:center;
    border: 1px solid #006dff;
    justify-content: center;

    text{
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: bold;
        font-size: 2.7vh;
        line-height: 21px;
        display: flex;
        text-align: center;
        color: #FFFFFF;
    }
`
const Header5 = styled.div`
margin-top:2.1vh;
width:100vw;
height:6.3vh;
display:flex;
justify-items: left;
`
const SearchBarContainer = styled.button`
margin-left:3.5vw;
min-width:51.7vw;
min-height:6.3vh;
border: 1px solid #006DFF;
box-sizing: border-box;
border-radius: 10px;
display:flex;
flex-direction:row;
background-color:#ffffff;
`
const SearchIcon = styled.img`
width:2.27vh;
height:2.27vh;
margin-top:1.4vh;
margin-left:3.73vw;
color:#006DFF;
`
const SearchBar = styled.div`
border:none;
max-width:35.47vw;
height:3.15vh;
margin-top:1.4vh;
margin-left:3.5vw;
font-size: 2.5vh;

`
const SuggestMe = styled.button`
margin-left: 5.6%;
width: 33.6vw;
bottom: 34.33%;

border: 1px solid #006DFF;
box-sizing: border-box;
border-radius: 10px;

background-color:#ffffff;

font-family: 'Source Sans Pro';
font-style: normal;
font-weight: 500;
font-size: 2.7vh;
line-height: 3.1vh;
align-items: center;

color: #006DFF;
`
const Container = styled.div`
    top:0;
    left:0;
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction: column;
`
const Header1 = styled.div`
    margin-left: 24.13vw;
    margin-right: 24.13vw;
    margin-top: 3.6vh;

    font-family: 'Source Sans Pro';
    justify-content:center;
    font-style: normal;
    font-weight: 400;
    font-size: 4.5vh;
    line-height: 5.4vh;

    display: flex;
    align-items: center;

    color: #000000;
`
const Header2 = styled.input`
    margin-left:5.6vw;
    margin-right:5.6vw;
    margin-top: 3.15vh;
    min-height:7.8vh;

    border: 1px solid;
    border-color: ${props => props.inputColor};
    box-sizing: border-box;
    border-radius: 10px;
    
    padding: 3vw;
    padding-left:5vw;
    overflow: hidden;
    text-overflow: ellipsis;

    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: bold;
    font-size: 4.5vh;
    line-height: 5.4vh;

    color: ${props => props.inputColor};

    ::placeholder{
        color: ${props => props.inputColor};
    }
    
`
const Header3 = styled.div`
    margin-left:5.6vw;
    margin-right:5.6vw;
    margin-top: 2.1vh;
    min-height:25.93vh;


    border: 1px solid ;
    border-color: ${props => props.inputColor};
    box-sizing: border-box;
    border-radius: 10px;

    textarea{
        border: none;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 10px;
        width: 87.39%;
        height:90%;
        padding-top:2vh;
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: normal;
        font-size: 2.7vh;
        line-height: 3.15vh;
        color: ${props => props.inputColor};
        .textWrapper{
            width:100%;
            overflow:hidden;
            text-overflow:ellipsis;
        }

        ::placeholder{
            color: ${props => props.inputColor};
            text-align:left;
        }
    }
`
const Header4 = styled.div`
    justify-content:left;
    flex-direction:column;
    text-align:left;
`
const TextSupport = styled.div`
    margin-left:5.6vw;
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: normal;
    font-size: 1.9vh;
    line-height: 2.25vh;
    
`
const NewTag = styled.img`
    width :5.44vw;
    height : 1.53vh;
    margin-left: 5px;

`
const PairNewTag = styled.div`
    max-width:21.3vw;
    text-align:left;
    margin-left:5.6vw;
    margin-top:3.15vh;
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: bold;
    line-height: 3.58vh;

    text{
        font-size:3vh;
    }
`
export default AddPost
