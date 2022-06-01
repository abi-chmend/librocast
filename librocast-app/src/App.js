import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from "react"
import SignUp from './signUp'
import Home from './components/Home'
import { AuthContext } from './authContext'
import './components/App.css'
import Search from './components/Search'
import Auth from './components/Auth'
import Onboard from './components/Onboarding'
import Nav from './components/Nav';
import Profile from './components/Profile';
import ProfileQuery from './components/ProfileQuery';
import Feed from 'components/Feed'

function App() {
  
  const { user, authIsReady } = useContext(AuthContext)


  return (
      <div className="App" >

        {authIsReady &&
            <BrowserRouter>
              {user ? <Nav></Nav> : null}
              <Routes>
                <Route path="/" element = {user ? <Navigate to="/home"/> : <Auth/>}></Route>
                <Route path="/login" element = {user ? <Navigate to="/home" /> : <Auth/>}></Route>
                <Route path="/signup" element= {user ? <Navigate to="/home" /> : <SignUp/>}></Route>
                <Route path="/home" element= {user ? <Home/> : <Navigate to="/login" />}></Route>
                <Route path="/feed" element={user ? <Feed/> : <Navigate to="/login" />}/>
                <Route path="/onboard" element={user ? <Onboard/> : <Navigate to="/login" />} />
                <Route path="/profile" element={user ? <Profile/> : <Navigate to="/login" />}/>
                <Route path="/search" element={<Search />}/>
                <Route path="/search/profile=:id" element={<ProfileQuery />} />
              </Routes>
            </BrowserRouter>}
      </div>
  )}

export default App;