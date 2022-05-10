import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './signUp'
import LogIn from './logIn'
import Home from './components/Home'
import { useAuthContext } from './useAuthContext'
import './components/App.css'
import Search from './components/Search'


function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="App">
      { authIsReady && (
        <BrowserRouter>
          <Routes>
              <Route path="/" />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
          </Routes>
        </BrowserRouter>
      )}


      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
      </BrowserRouter>


      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Search />}/>
        </Routes>

      </BrowserRouter>
    </div>
  )}

export default App;