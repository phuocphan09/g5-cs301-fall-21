import './App.css';
import styled from 'styled-components';
import InputEmail from './pages/Login/InputEmail';
import InputPassword from './pages/Login/InputPassword';
import ProtectedRoute from './pages/ProtectedRoute';
import CreateAccount from './pages/Login/CreateAccount';
import SuccessAuth from './pages/Login/SuccessAuth';
import SuccessCreate from './pages/Login/SuccessCreate';
import EmptyInterest from './pages/InterestConfig/EmptyInterest';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import AddInterest from './pages/InterestConfig/AddInterest';


function App() {
  const [width, setWindowWidth] = useState(0)
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [])
  const updateDimensions = () => {
    const width = window.innerWidth
    setWindowWidth(width)
  }

  const [inputEmail, setInputEmail] = useState('')
  const changeInputEmail = (e) => {
    setInputEmail(e)
  }

  const [inputPassword, setInputPassword] = useState('')
  const changeInputPassword = (e) => {
    setInputPassword(e)
  }

  return (
    <div className='App'>
      <Container>
        <Wrapper>
          {/* <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/EmptyInterest" element={<EmptyInterest />}/>
              <Route path="/Feed" element={<Feed />} />
            </Route>
            <Route path="/InputEmail" element={<InputEmail props={changeInputEmail} />} />
            <Route path="/InputPassword" element={<InputPassword email={inputEmail} passwordInput={changeInputPassword} />} />
            <Route path="/CreateAccount" element={<CreateAccount email={inputEmail} passwordInput={changeInputPassword} />} />
            <Route path="/SuccessAuth" element={<SuccessAuth />} />
            <Route path="/SuccessCreate" element={<SuccessCreate />} />
          </Routes> */}
          <AddInterest></AddInterest>
        </Wrapper>
      </Container>
    </div>
  );
}

const Container = styled.div` 
display:flex;

`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;


export default App;
