import { React, useState, useEffect } from 'react'
import styled from 'styled-components'
import remove_icon from '../../assets/remove_icon.svg'
import add_icon from '../../assets/add_icon.svg'
import added_icon from '../../assets/added_icon.svg'
import GetActive from '../../get.addable'
import { useNavigate } from 'react-router-dom'

const ActiveInterest = (props) => {

    const pickStateR = { color: '#15B34E', width: '27vw' }
    const pickStateNR = { color: '#FF0000', width: '25vw' }

    const [interest, setInterest] = useState([])
    let initialInterestState = []
    // console.log(userEmail);

    const navigate = useNavigate()
    function handleAdd() {
        navigate('/AddInterest')
    }

    function handleHome() {
        navigate('/HomePage')
    }


    useEffect(() => {
        const userEmail = localStorage.getItem("user");
        GetActive.getActiveInterest(userEmail)
            .then(response => {
                console.log(response)
                response.data.activeInterestList.map((itemAPI, indexAPI) => {
                    initialInterestState.push({ interestName: itemAPI.interestName, interestState: pickStateNR })
                })
                setInterest(initialInterestState)
            })
    }, [])



    // { interestName: 'Social Science', interestState: pickStateNR },
    // { interestName: 'Marketing', interestState: pickStateNR },
    // { interestName: 'Natural Science', interestState: pickStateNR },
    // { interestName: 'Psychology', interestState: pickStateNR },
    // { interestName: 'Bussiness', interestState: pickStateNR }

    // setInterest(initialInterestState)

    const [dropIndex, setDropIndex] = useState(-1)

    useEffect(() => {
        if (dropIndex >= 0) {
            setTimeout(() => {
                // console.log(dropIndex)
                let cloneInterest = interest
                cloneInterest.splice(dropIndex, 1)
                setInterest(cloneInterest)
                setDropIndex(-1)
            }, 1000)
        }

    }, [dropIndex])

    function handleRemove(props) {

        let newInterestItem = interest[props]
        newInterestItem.interestState = pickStateR

        // console.log(newInterestItem.interestName)

        GetActive.removeInterest(localStorage.getItem("user"), newInterestItem.interestName)
            .then(response => console.log(response.data.result))

        let cloneInterest = interest
        cloneInterest[props] = newInterestItem

        setInterest(cloneInterest)
        setDropIndex(props)
    }

    const showButton = (props) => {
        // console.log(props.color)
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

    return (
        <Container>
            <Container1>
                <Text fontSize={'3.6vh'} fontWeight={'700'}>Add new interests</Text>
                <br></br>
                <Text fontSize={'2.25vh'} fontWeight={'400'}>A post matching any of your interests will be automatically notified via your student email</Text>
            </Container1>

            <AddInterest onClick={handleAdd}>
                <text>
                    <RemoveIcon src={add_icon} />
                    Add new interests
                </text>
            </AddInterest>

            <ColoredLine />

            <Container1>
                <Text fontSize={'3.6vh'} fontWeight={'700'}>Your active interests</Text>
                <br></br>
                <Text fontSize={'2.25vh'} fontWeight={'400'}>Removing an active interest when you no longer want to receive notifications of matched posts</Text>
            </Container1>

            <Container2>
                {interest.length !== 0 ? interest.map((item, index) => (
                    <InterestContainer buttonColor={item.interestState.color} buttonWidth={item.interestState.width}>
                        <text> {item.interestName} </text>
                        {showButton({ color: item.interestState.color, number: index })}
                    </InterestContainer>
                )) : <DashedBox><h4> Uh oh... you haven’t added any interests <br /> Select the above blue button to add one! </h4></DashedBox>}
            </Container2>

            <Block7>

                </Block7>

                <Header7>
                    <SubmitButton>
                        <text>Back to Homepage</text>
                    </SubmitButton>
                </Header7>
        </Container>
    )
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

const AddInterest = styled.button`
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
        margin-right: 5vw;
        margin-left: 5vw;
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

const ColoredLine = styled.div`
    position: relative;
    width: 88.8vw;
    margin-left: 5.87%;
    border: 1px solid #000000;
    background: #000000;
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

const RemoveIcon = styled.img`
    width: 3vh;
    height: 3vh;
    margin-right: 5px;
    justify-content:center;
`

// const AddIcon = styled.img`
//     margin-left: 6vw;
// `

const DashedBox = styled.div`
    ${'' /* position: absolute; */}
    background-color: #FFFFFF;
    box-sizing: border-box;
    border-radius: 5px;
    align-items: center;
    border: dashed 1px #6B6B6B;
    margin-left: 9.3vw;
    margin-right: 9.3vw;
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
        ${'' /* margin: 1rem; */}
    }
`;

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
        align-text: center;
        color: #FFFFFF;
    }
`

export default ActiveInterest
