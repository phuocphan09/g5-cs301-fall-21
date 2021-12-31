import {React, useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components';
import sstyled from 'styled-components/native';
import AddIcon_raw from '../../assets/add_icon.svg';
import AddedIcon_raw from '../../assets/added_icon.svg';

const AddInterest = () => {

    const pickStateNA = {color: '#006DFF', width: '18.13vw'}
    const pickStateA = {color: '#15B34E', width: '20vw'}

    const [interest, setInterest] = useState([
        {interestName: 'Social Science', interestState: pickStateNA},
        {interestName: 'Marketing', interestState: pickStateNA},
        // {interestName: 'Hooligan', interestState: pickStateNA},
        // {interestName: 'Hooligan', interestState: pickStateNA},
        // {interestName: 'Hooligan', interestState: pickStateNA},
        {interestName: 'Natural Science', interestState: pickStateA},
        {interestName: 'Psychology', interestState: pickStateA},
        {interestName: 'Bussiness', interestState: pickStateA}
    ])

    const [updateState, setUpdateState] = useState([])
    const [dropIndex, setDropIndex] = useState()

    function handleAdd (props) {
        
        let newInterestItem = interest[props]
        newInterestItem.interestState = pickStateA
        
        let cloneInterest = interest
        cloneInterest[props] = newInterestItem
        setUpdateState(cloneInterest)

        setDropIndex(props)

    }

    useEffect(()=>  {
        if (updateState.length > 0){
            setInterest(updateState)
            setTimeout(() => {
                let cloneInterest = interest
                cloneInterest.splice(dropIndex,1)
                setInterest(cloneInterest)
            },1000)
            setDropIndex()
            setUpdateState([])}
            
    },[updateState])

    console.log(interest)

    const showButton = (props) => {
        console.log(props.color)
        if (props.color === '#15B34E'){
            return <button> 
                        <view >Added</view>
                        <AddIcon src={AddedIcon_raw}></AddIcon>
                    </button>
        } else {
            return <button onClick={() => handleAdd(props.number)}> 
                        <view>Add</view>
                        <AddIcon src={AddIcon_raw}></AddIcon>
                    </button>
        }
    }

    return (
        <Container>
            <Container1>
                <Text fontSize = {'3.6vh'} fontWeight={'700'}>Add new interests</Text>
                <br></br>
                <Text fontSize = {'2.25vh'} fontWeight={'400'}>A post matching any of your interests will be automatically notified via your student email</Text>
            </Container1>
        
            <Container2>
                {interest.map((item,index) =>(
                    <InterestContainer buttonColor = {item.interestState.color} buttonWidth ={item.interestState.width}>
                        <text> {item.interestName} </text>
                        {showButton({color:item.interestState.color, number: index})}
                    </InterestContainer>
                ))}
            </Container2>
        
            <SubmitContainer>
                <text>Done</text>
            </SubmitContainer>
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

const Container1 = styled.div`
margin-left: 6.4vw;
margin-right: 5.33vw;
margin-top: 6.75vh;
margin-bottom: 3.3vh;
font-family: 'Source Sans Pro';
font-style: normal;
line-height: 2.68vh;
color: #000000;
display: flex;
flex-direction: column;
`

const Text = styled.div`
text-align: left ;
font-size: ${props => props.fontSize };
font-weight: ${props => props.fontWeight };
`

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

text{
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

button{
    position: absolute;
    display: flex;
    right: 4.5%;
    top:19.23%;
    height: 61.54%;
    background: #FFFFFF;
    border: 1px solid #006DFF;
    box-sizing: border-box;
    border-radius: 15px;
    border-color: ${props => props.buttonColor };
    width:  ${props => props.buttonWidth };
}

view{
    position: absolute;
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    top: 28.12%;
    right:16.84%;

    color: ${props => props.buttonColor };
}
`
const AddIcon = styled.img`
    width: 4.83vw;
    height: 3vh;
    position: absolute;
    top: 18.75%;
    left: 12%;
`

const SubmitContainer = styled.button`
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

text{
    margin-left: 41.4%;
    /* margin-left: 39%;
    margin-top: 5.06%; */

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
export default AddInterest
