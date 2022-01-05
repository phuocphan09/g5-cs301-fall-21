import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import searchIcon from '../../assets/search_icon.svg'
import line from '../../assets/Line 1.svg'
import styled from 'styled-components'
import added_icon from '../../assets/added_icon.svg'
import add_icon from '../../assets/add_icon.svg'

const SearchBar = (propsAPI) => {

    const pickStateNA = { color: '#006DFF', width: '18.13vw' }
    const pickStateA = { color: '#15B34E', width: '20vw' }

    const pickStateR = { color: '#15B34E', width: '27vw' }
    const pickStateNR = { color: '#FF0000', width: '25vw' }

    const [interestSuggested, setInterestSuggested] = useState([])
    const [interestToPickS, setInterestToPickS] = useState(propsAPI.toPick.toPickList)
    const [dropIndex, setDropIndex] = useState(-1)
    const [interestAdded, setInterestAdded] = useState(propsAPI.picked.pickedList)

    useEffect(()=>{
        propsAPI.toPick.function1(interestToPickS)
    },[interestToPickS])

    useEffect(()=>{
        propsAPI.picked.function2(interestAdded)
    },[interestAdded])

    function handleButtonCSS(props){
        let cloneProp = [...props]
        cloneProp.map((item)=>{
            if(item.interestState.color === '#FF0000'){
                item.interestState = pickStateNA
            }
        })
        console.log(cloneProp)
        return cloneProp
    }
    const [modSuggested, setModSuggested] = useState()

    useEffect(()=>{
        setModSuggested(handleButtonCSS([...interestSuggested]))
    },[interestSuggested])

    // useEffect(()=>{
    //     setModToPick(handleButtonCSS(interestToPickS))
    // },[interestToPickS])

    function handleAdd(props) {

        let newInterestItem = {...interestSuggested[props]}
        newInterestItem.interestState = pickStateA

        let cloneInterest = interestSuggested
        cloneInterest[props] = newInterestItem

        setDropIndex(props)

        let newAddbackInterestItem = {...newInterestItem};
        newAddbackInterestItem.interestState = pickStateNR

        let addbackInterestClone = [...interestAdded]
        addbackInterestClone.push(newAddbackInterestItem)

        setInterestAdded([...addbackInterestClone])
    }
    
    const showButton = (props) => {
        if (props.color === "#15B34E") {
            return <button>
                <view >
                    <RemoveIcon src={added_icon}></RemoveIcon>
                    Added
                </view>
            </button>
        } else {
            return (
                <button onClick={() => handleAdd(props.number)}>
                    <view>
                        <RemoveIcon src={add_icon}></RemoveIcon>
                        Add
                    </view>
                </button>
            )
        }
    }
    useEffect(() => {
        if (dropIndex >= 0) {
            setTimeout(() => {
                let cloneInterest = interestSuggested
                cloneInterest.splice(dropIndex, 1)
                setInterestSuggested(cloneInterest)
                setDropIndex(-1)
            }, 500)
        }

    }, [dropIndex])
    
    function searchFunctionSuggestMe(props){
        let searchString = props.target.value;

        let cloneInterestToSuggest = [...interestSuggested];
        let cloneInterestToPick = [...interestToPickS];

        cloneInterestToPick.map((item,index)=>{
            if (searchString.includes(item.interestName.toLocaleLowerCase())){
            // if (item.interestName.toLocaleLowerCase().includes(searchString)){
                cloneInterestToSuggest.push(item)
                cloneInterestToPick.splice(index,1)
            }
        })

        let finalSuggest = []
        cloneInterestToSuggest.map((item,index)=>{
            if(!searchString.includes(item.interestName.toLocaleLowerCase())){
            // if(!item.interestName.toLocaleLowerCase().includes(searchString)){
                cloneInterestToPick.push(item)
            } else {
                finalSuggest.push(item)
            }
        })
        setInterestToPickS([...cloneInterestToPick])
        setInterestSuggested([...finalSuggest])
    }


    function handleSubmitTopic(){
        setInterestToPickS([])
        propsAPI.pageStatefunc(true)
    }
    
    return (
        <Container>
            <SearchBarContainer>
                <SearchIcon src={searchIcon}/>
                <SearchBarInput placeholder='Search for Topics' onChange={(e)=>searchFunctionSuggestMe(e)}></SearchBarInput>
            </SearchBarContainer >

            <LineBreakCont src={line}></LineBreakCont>

            <SuggestionList>
                {interestSuggested.map((item, index) => (
                    <InterestContainer buttonColor={item.interestState.color} buttonWidth={item.interestState.width}>
                        <text> {item.interestName} </text>
                        {showButton({ color: item.interestState.color, number: index })}
                    </InterestContainer>
                )) }
            </SuggestionList>
            
            <SubmitButton onClick={()=> handleSubmitTopic()}>
                <text>Back to edit post</text>
            </SubmitButton>

        </Container>
    )
}
const SubmitButton = styled.button`

    margin-top:3.3vh;
    margin-bottom:3.3vh;
    min-width: 71.47vw;
    min-height:7.05vh;
    background: #006DFF;
    border-radius: 5px;
    transition: all 0.3s ease-out;
    display:flex;
    align-items:center;
    justify-content: center;
    border: 1px solid #006dff;


    text{
        
        font-style: normal;
        font-weight: bold;
        font-size: 2.7vh;
        line-height: 21px;
        display: flex;
        align-items: center;
        color: #FFFFFF;
    }
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
const SuggestionList = styled.div`
    margin-top: 2.1vh;
    left:0%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex:1;
    gap:3.3vh;
    transition: all 0.3s ease-out;
`
const SearchBarContainer = styled.div`
width:88.8vw;
margin-top: 4.2vh;
min-height:6.3vh;
border: 1px solid #006DFF;
box-sizing: border-box;
border-radius: 10px;
display:flex;
flex-direction:row;
background-color:#ffffff;
`
const SearchIcon =styled.img`
width:2.27vh;
height:2.27vh;
margin-top:1.4vh;
margin-left:3.73vw;
color:#006DFF;
`
const SearchBarInput = styled.input`
border:none;
min-width:73vw;
height:3.15vh;
margin-top:1.4vh;
margin-left:3.5vw;
font-size: 2.5vh;

`
const LineBreakCont = styled.img`
margin-top:2.55vh;
width:90.93vw;
`
const Container = styled.div`
    top:0;
    left:0;
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction: column;
    align-items:center;
`
const RemoveIcon = styled.img`
    width: 3vh;
    height: 3vh;
    margin-right: 5px;
    justify-content:center;
`
export default SearchBar
