import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './signUp'
import LogIn from './logIn'
import Home from './components/Home'
import { useAuthContext } from './useAuthContext'
import './components/App.css'
import Auth from './components/Auth'
import Onboard from './components/Onboarding'
import Nav from './components/Nav';

function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="App">
      <Nav></Nav>
      <BrowserRouter>
      <Routes>
        <Route path="/onboard" element={<Onboard/>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element = {<Auth />}></Route>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </BrowserRouter>
    </div>
  )}

export default App;