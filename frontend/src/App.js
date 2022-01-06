import './App.css';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// ProtectedRoute
import ProtectedRoute from './pages/ProtectedRoute';
// InterestConfig
import AddInterest from './pages/InterestConfig/AddInterest';
import ActiveInterest from './pages/InterestConfig/ActiveInterest';
// Login
import InputEmail from './pages/Login/InputEmail';
import InputPassword from './pages/Login/InputPassword';
import CreateAccount from './pages/Login/CreateAccount';
import SuccessAuth from './pages/Login/SuccessAuth';
import SuccessCreate from './pages/Login/SuccessCreate';
import SuccessLogout from './pages/Login/SuccessLogout';
// Post
import ViewPost from './pages/Post/ViewPost';
import HomePage from './pages/Post/HomePage';
import AddPost from './pages/Post/AddPost'
import PersonalPage from './pages/Post/PersonalPage';
import ResultAddPost from './pages/Post/ResultAddPost';



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
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/AddInterest" element={<AddInterest />} />
              <Route path="/ActiveInterest" element={<ActiveInterest />} />
              <Route path="/AddPost" element={<AddPost />}></Route>
              <Route path="/ResultAddPost" element={<ResultAddPost />} />
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/PersonalPage" element={<PersonalPage />} />
              <Route path="/ViewPost" element={<ViewPost />} />
              <Route path="/SuccessLogout" element={<SuccessLogout />} />
            </Route>
            <Route path="/InputEmail" element={<InputEmail props={changeInputEmail} />} />
            <Route path="/InputPassword" element={<InputPassword email={inputEmail} passwordInput={changeInputPassword} />} />
            <Route path="/CreateAccount" element={<CreateAccount email={inputEmail} passwordInput={changeInputPassword} />} />
            <Route path="/SuccessAuth" element={<SuccessAuth />} />
            <Route path="/SuccessCreate" element={<SuccessCreate />} />
          </Routes>
          {/* <HomePage/> */}
          {/* <PersonalPage/> */}
          <Routes>
          <Route path="/AddInterest" element={<AddInterest />} />
            <Route path="/ActiveInterest" element={<ActiveInterest />} />

          </Routes>
          
          <ViewPost/>
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
