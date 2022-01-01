import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import AddIcon_raw from '../../assets/add_icon.svg';
import AddedIcon_raw from '../../assets/added_icon.svg';
import GetAddable from '../../get.addable'

const AddInterest = (props) => {

    const pickStateNA = { color: '#006DFF', width: '18.13vw' }
    const pickStateA = { color: '#15B34E', width: '20vw' }

    const [interest, setInterest] = useState([]);

    let initialInterestState = []

    useEffect(() => {
        const userEmail = localStorage.getItem("user")
        GetAddable.getAddable(userEmail)
            .then(response => {
                console.log(response.data)
                response.data.addableInteresList.map((itemAPI, indexAPI) => {
                    // console.log(itemAPI.interestName)
                    // initialInterestState = initialInterestState.concat({ interestName: itemAPI.interestName, interestState: pickStateNA })
                    initialInterestState.push({ interestName: itemAPI.interestName, interestState: pickStateNA })
                })
                console.log(initialInterestState)
                setInterest(initialInterestState);
            })
    }, [])


    // initialInterestState = initialInterestState.concat({ interestName: 'Bussiness', interestState: pickStateNA })
    // initialInterestState = initialInterestState.concat({ interestName: 'Psychology', interestState: pickStateNA })
    // initialInterestState = initialInterestState.concat({ interestName: 'Natural Science', interestState: pickStateNA })
    // initialInterestState = initialInterestState.concat({ interestName: 'Marketing', interestState: pickStateNA })
    // initialInterestState = initialInterestState.concat({ interestName: 'Social Science', interestState: pickStateNA })

    // console.log(initialInterestState)


    // console.log(interest)

    const [dropIndex, setDropIndex] = useState(-1)

    useEffect(() => {
        if (dropIndex >= 0) {
            setTimeout(() => {
                console.log(dropIndex)
                let cloneInterest = interest
                cloneInterest.splice(dropIndex, 1)
                setInterest(cloneInterest)
                setDropIndex(-1)
            }, 500)
        }

    }, [dropIndex])

    function handleAdd(props) {

        let newInterestItem = interest[props]
        newInterestItem.interestState = pickStateA

        console.log(newInterestItem.interestName)

        GetAddable.addNewInterest( localStorage.getItem("user"), newInterestItem.interestName )
            .then(response => console.log(response.result))

        let cloneInterest = interest
        cloneInterest[props] = newInterestItem

        cloneInterest.splice(dropIndex, 1)
        setInterest(cloneInterest)
        setDropIndex(props)
    }

    const showButton = (props) => {
        if (props.color === '#15B34E') {
            return <button>
                <view >
                    <AddIcon src={AddedIcon_raw}></AddIcon>
                    Added
                </view>
            </button>
        } else {
            return <button onClick={() => handleAdd(props.number)}>
                <view>
                    <AddIcon src={AddIcon_raw}></AddIcon>
                    Add
                </view>
            </button>
        }
    }

    return (
        <Container>
            <Container1>
                <Text fontSize={'3.6vh'} fontWeight={'700'}>Add new interests</Text>
                <br></br>
                <Text fontSize={'2.25vh'} fontWeight={'400'}>A post matching any of your interests will be automatically notified via your student email</Text>
            </Container1>

            <Container2>
                {interest.map((item, index) => (
                    <InterestContainer buttonColor={item.interestState.color} buttonWidth={item.interestState.width}>
                        <text> {item.interestName} </text>
                        {showButton({ color: item.interestState.color, number: index })}
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
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
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
        align-items:center;
        justify-content:center;
        position: absolute;
        display: flex;
        right: 4.5%;
        top:19.23%;
        height: 61.54%;
        background: #FFFFFF;
        border: 1px solid #006DFF;
        box-sizing: border-box;
        border-radius: 15px;
        border-color: ${props => props.buttonColor};
        width:  ${props => props.buttonWidth};
    }

    view{
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
const AddIcon = styled.img`
    width: 3vh;
    height: 3vh;
    margin-right: 5px;
    justify-content:center;
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
export default AddInterest
