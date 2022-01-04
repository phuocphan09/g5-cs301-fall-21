import React from 'react'
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
                            Description <br /> </h2>

                        <line />

                        <h2> Posted by: an@student.fulbright.edu.vn </h2>
                    </TextWrapper>

                    <InterestWrapper>
                        <InterestLabel>
                            <h2> Engineering </h2>
                        </InterestLabel>
                        <InterestLabel>
                            <h2> Engineering </h2>
                        </InterestLabel>
                        <InterestLabel>
                            <h2> Engineering </h2>
                        </InterestLabel>
                    </InterestWrapper>

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
    align-items: center;
`

const InterestWrapper = styled.div`
    position:relative;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: left;
    inline-size: 90vw;
    width: 90vw;
    margin-right:1vw;
    margin-left: 2vw;
    margin-bottom: 5vw;
    overflow-wrap: inherit;
`

const InterestLabel = styled.div`
    position: relative;
    background-color: #FFFFFF;
    box-sizing: border-box;
    border-radius: 2px;
    border: solid 1px #6B6B6B;
    align-items: center;
    justify-content: center;
    margin-right: 0.2rem;
    overflow-wrap: inherit;


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
        margin-right: 1rem;
        overflow-wrap: break-word;
    }
    
    line {
        position: relative;
        width: 80vw;
        margin-top: 2vh;
        margin-left: 2vw;
        border: 0.5px solid #000000;
        background: #000000;
    }
`

const PostBox = styled.div`
    background-color: #FFFFFF;
    box-sizing: border-box;
    border-radius: 5px;
    border: solid 1px #006DFF;
    margin-top: 5vh;
    margin-bottom: 5vh;
    margin-left: 5vw;
    margin-right: 5vw;
    inline-size: 90vw;
    width: 90vw;
    overflow-wrap: break-word;

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
    overflow-wrap: break-word;

    h4 {
        font-family: 'Source Sans Pro';
        width: 100%;
        height: 100%;
        color: #000000;
        font-style: normal;
        font-weight: normal;
        font-size: 2.25vh;
        text-align: center;
        overflow-wrap: break-word;
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
    margin-right:5vw;
    margin-left:5vw;
    min-height:7.05vh;
    width:70vw;
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
