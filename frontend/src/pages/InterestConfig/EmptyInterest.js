import React from 'react'
import styled from 'styled-components'
import { ReactComponent as AddIcon } from '../../assets/add_icon.svg';

const InterestConfig = () => {
    return (
        <Container>
            <TextWrapper>
                <h1> Add new interests </h1>
                <h2> A post matching any of your interests will be automatically notified via your student email </h2>
            </TextWrapper>
            <Button>
                <h3>
                    <AddIcon className='AddIcon' /> Add new interests
                </h3>
            </Button>
            {/* <div style={{ borderTop: "2px solid #000000 ", marginLeft: 20, marginRight: 20 }}></div> */}
            <ColoredLine color="black" />
            <TextWrapper>
                <h1> Your active interests </h1>
                <h2> Removing an active interest when you no longer want to receive notifications of matched posts </h2>
            </TextWrapper>
            <DashedBox>
                <h4>
                    Uh oh... you haven’t added any interests
                    <br />
                    Select the above blue button to add one!
                </h4>
            </DashedBox>
        </Container>
    )
}

const Container = styled.div`
    position:absolute;
    top:0%;
    left:0%;
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:0.5rem;
`;

const TextWrapper = styled.div`
    top: 5%;
    left: 5%;
    width: 85%;
    align-items: center;
    
    h1{
        font-family: 'Source Sans Pro';
        text-align: left;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 10px;
        top: 6.75%;
        left: 6.4%;
    }

    h2 {
        font-family: 'Source Sans Pro';
        text-align: left;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 23,87px;
        top: 6.75%;
        left: 20%;
    }
`;

const Button = styled.button`
    margin: 1rem;
    width: 71.46 %;
    height: 7.05 %;
    top: 25.92 %;
    left: 14.4 %;
    background-color: #FFFFFF;
    border-radius: 5px;
    align-items: center;
    border: solid 2px #006DFF;
    cursor: pointer;
    transition: all 0.2s ease-in;

    h3{
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #006DFF;
        margin: 1rem;
    }
`;

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            width: 341
        }}
    />
);

const DashedBox = styled.div`
    width: 81.33 %;
    height: 9.15%;
    top: 25.92 %;
    left: 14.4 %;
    background-color: #FFFFFF;
    box-sizing: border-box;
    border-radius: 5px;
    align-items: center;
    border: dashed 1px #6B6B6B;
    margin: 1rem;

    h4 {
        font-family: 'Source Sans Pro';
        width: 100%;
        height: 100%;
        color: #6B6B6B;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        text-align: left;
        margin: 1rem;
    }
`;

export default InterestConfig
