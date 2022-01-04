import React from 'react'
import { View } from 'react-native-web'
import styled from 'styled-components'
import Post from '../../post.service'

const ViewPost = () => {
    const response = 'success'
    // Post.GetPost(localStorage.getItem("id")
    //     .then(response => console.log(response.data.result)))

    if (response === 'not found') {
        return (
            <Container>
                <DashedBox>
                    <h4> Uh oh... <br /> Post not found :( </h4>
                </DashedBox>

                <BackContainer>
                    <text> Back to homepage </text>
                </BackContainer>
            </Container>
        )
    } else {
        return (
            <Container>
                <PostBox>
                    <TextWrapper>
                        <h1> Title sdakfdshafkjelwqfiodhsahfjkdasdasdasdasdasdasdasddlshafewoafhdskajlfhjkdlfehiwq </h1>
                        <line />

                        <h2>
                            Description <br /> fdsafhsjdkasdasdasdasdalhfjdskalhfewuifhdsjaklfhdsakfjlhdsajklfhdsajkflhdsajkl
                        </h2>

                        <line />

                        <h2> Posted by: an@student.fulbright.edu.vn </h2>
                    </TextWrapper>
                </PostBox>

                <BackContainer>
                    <text> Back to homepage </text>
                </BackContainer>
            </Container>
        )
    }
}

const Container = styled.div`
    top:0;
    left:0;
    height:100vh;
    width:100vw;
    display: flex;
    flex-direction: column;
    justify-content: left;
    inline-size: min-content;
`

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    inline-size: 100vw;
    overflow-wrap: break-word;
    ${'' /* width: min-content; */}
    ${'' /* height: min-content; */}

    h1 {
        font-family: 'Source Sans Pro';
        color: #000000;
        font-style: normal;
        font-weight: bold;
        font-size: 3vh;
        text-align: left;
        margin-left: 1rem;
        margin-right: 1rem;
    }

    h2 {
        font-family: 'Source Sans Pro';
        color: #000000;
        font-style: normal;
        font-weight: normal;
        font-size: 2vh;
        text-align: left;
        margin-left: 1rem;
        margin-right: 1rem;

    }
    
    line {
        position: relative;
        width: 70vw;
        margin-top: 2vh;
        margin-left: 5vw;
        margin-right: 5vw;
        border: 0.5px solid #000000;
        background: #000000;
        
    }
`

const PostBox = styled.div`
    ${'' /* max-width: 100vw; */}
    ${'' /* max-height: 100vh; */}
    background-color: #FFFFFF;
    box-sizing: border-box;
    border-radius: 5px;
    border: solid 1px #006DFF;
    margin-top: 5vh;
    margin-bottom: 5vh;
    margin-left: 9.3vw;
    margin-right: 9.3vw;
    justify-content: center;
    inline-size: 100vw;

`;

const DashedBox = styled.div`
    background-color: #FFFFFF;
    box-sizing: border-box;
    border-radius: 5px;
    align-items: center;
    border: dashed 1px #6b6b6b;
    margin-top: 20vh;
    margin-bottom: 20vh;
    margin-left: 10vw;
    margin-right: 10vw;
    justify-content:center;

    h4 {
        font-family: 'Source Sans Pro';
        width: 100%;
        height: 100%;
        color: #000000;
        font-style: normal;
        font-weight: normal;
        font-size: 2.25vh;
        text-align: center;
    }
`;

// const ColoredLine = styled.div`
//     position: relative;
//     width: 70vw;
//     margin-top: 3.3vh;
//     margin-left: 5vw;
//     margin-right: 5vw;
//     border: 1px solid #000000;
//     background: #000000;
// `

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

export default ViewPost
