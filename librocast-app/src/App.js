import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import SignUp from './signUp'
import LogIn from './logIn'
import Home from './components/Home'
import { useAuthContext } from './useAuthContext'
import './components/App.css'
import Search from './components/Search'
import Auth from './components/Auth'
import Onboard from './components/Onboarding'
import Nav from './components/Nav';
import Profile from './utils/profile/Profile';
import {useState} from 'react';

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App" >
      {/*}
      { authIsReady && (
        <BrowserRouter>
          <Routes>
              <Route path="/" />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
          </Routes>
        </BrowserRouter>
      )}
      */}


      {authIsReady &&
      <BrowserRouter>
        {user ? <Nav></Nav> : null}
        <Routes>
            <Route path="/" element = {user ? <Navigate to="/home"/> : <Auth/>}></Route>
            <Route path="/login" element = {user ? <Navigate to="/home" /> : <Auth/>}></Route>
            <Route path="/signup" element= {user ? <Navigate to="/home" /> : <SignUp/>}></Route>
            <Route path="/home" element= {user ? <Home/> : <Navigate to="/login" />}></Route>
            <Route path="/onboard" element={user ? <Onboard/> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile/> : <Navigate to="/login" />}/>
            <Route path="/search" element={<Search />}/>
        </Routes>
      </BrowserRouter>}

       

    </div>
  )}

export default App;