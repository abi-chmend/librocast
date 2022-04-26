import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './signUp'
import LogIn from './logIn'
import { useAuthContext } from './useAuthContext'

function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Routes>
              <Route path="/" />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  )}

export default App;